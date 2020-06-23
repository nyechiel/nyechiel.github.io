---
layout: post
title: LLDP traffic and Linux bridges
date: 2016-01-04 12:58:19.000000000 +02:00
categories:
- Blog
- Hands On
- SDN &amp; Open Networking
tags:
- Bridge
- Linux
- LLDP
- Virtualization
meta:
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '18407025715'
  publicize_google_plus_url: https://plus.google.com/+NirYechiel1/posts/cAJW9tzsu7W
  _publicize_done_7835650: '1'
  _wpas_done_7830923: '1'
  _thumbnail_id: '173'
  geo_public: '0'
  _edit_last: '30422920'
permalink: "/2016/01/04/lldp-traffic-and-linux-bridges/"
---
In my [previous post](/2015/12/31/hands-on-with-fedora-kvm-and-cumulus-vx/) I described my Cumulus VX lab environment which is based on Fedora and KVM. One of the first things I noticed after bringing up the setup is that although I have got L3 connectivity between the emulated Cumulus switches, I can’t get [LLDP](http://www.ieee802.org/1/pages/802.1ab.html) to operate properly between the devices. 

For example, a basic ICMP ping between the directly connected interfaces of leaf1 and spine3 is successful, but no LLDP neighbor shows up:
<blockquote>
<pre><span style="font-weight:400;">cumulus@leaf1$ ping 13.0.0.3
</span><span style="font-weight:400;">PING 13.0.0.3 (13.0.0.3) 56(84) bytes of data.
</span><span style="font-weight:400;">64 bytes from 13.0.0.3: icmp_req=1 ttl=64 time=0.210 ms
</span><span style="font-weight:400;">64 bytes from 13.0.0.3: icmp_req=2 ttl=64 time=0.660 ms
</span><span style="font-weight:400;">64 bytes from 13.0.0.3: icmp_req=3 ttl=64 time=0.635 ms</span></pre>
</blockquote>
<blockquote>
<pre><span style="font-weight:400;">cumulus@leaf1$ lldpcli show neighbors 

</span><span style="font-weight:400;">LLDP neighbors:
-------------------------------------
</span></pre>
</blockquote>
Reading through the Cumulus Networks [documentation](https://docs.cumulusnetworks.com/display/CL22/Link+Layer+Discovery+Protocol), I discovered that LLDP is turn on by default on all active interfaces. It is possible to tweak things, such as&nbsp;timers, but the basic neighbor discovery functionality should be there by default.

Looking at the output from **_lldpcli show statistics_** I also discovered that LLDP messages are being sent out of the interfaces, but never received.


### So what’s going on?

Remember that leaf1 and spine3 are not really directly connected. They are bridged together using a Linux bridge device.

This is where I discovered that by design, Linux bridges silently drop LLDP messages (sent to the LLDP\_Multicast address 01-80-C2-00-00-0E) and other control frames in the 01-80-C2-00-00-xx range.

Explanation to that can be found in the [802.1AB standard](https://www.google.co.il/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwjk68DciZDKAhXFVhQKHUUCDZgQFggbMAA&url=http%3A%2F%2Fwww.ieee802.org%2F1%2Fpages%2F802.1ab.html&usg=AFQjCNHYeuIqDzT21Lvc1JpGeiSSqJQtOw&sig2=a3rWYOM3FoNWPft4j7J58A) which is stating that “the destination address shall be 01-80-C2-00-00-0E. This address is within the range reserved by IEEE Std 802.1D-2004 for protocols constrained to an individual LAN, and ensures that the LLDPDU will _not_ be forward by MAC Bridges that conform to IEEE Std 802.1D-2004.”

It is possible to change this behavior on a per bridge basis, though, by using:

> ```
> # echo 16384 \> /sys/class/net/\<bridge\_name\>/bridge/group\_fwd\_mask
> ``` 

### Retesting with leaf1 and spine3

> ```
> # echo 16384 \> /sys/class/net/virbr1/bridge/group\_fwd\_mask
> ```

LLDP now operates as expected between leaf1 and spine3. Remember that this is a per bridge setting, so in order to get this fixed across the entire setup, the command needs to be issued for the rest of the bridges (virbr2, virbr3, virbr4) as well.

