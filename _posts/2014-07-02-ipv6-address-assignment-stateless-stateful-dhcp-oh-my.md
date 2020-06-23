---
layout: post
title: IPv6 address assignment – stateless, stateful, DHCP... oh my!
date: 2014-07-02 19:40:15.000000000 +03:00
categories:
- Blog
- Foundations
- Hands On
tags:
- IPv6
comments_id: 2
permalink: "/2014/07/02/ipv6-address-assignment-stateless-stateful-dhcp-oh-my/"
---
People don’t like changes. IPv6 could have help to solve a lot of the burden in networks deployed today, which are still mostly based on the original version of the Internet Protocol, aka version 4. But time has come, and even the old tricks like throwing network address translation (NAT) everywhere are not going to help anymore, simply because we are out of IP addresses. It may take some more time, and people will do everything they can to (continue and) delay it, but believe me – there is no other way around – IPv6 is here to replace IPv4. IPv6 is also a critical part of the promise of the cloud and the Internet of Things (IoT). If you want to connect everything to the network, you better plan for massive scale and have enough addresses to use.

One of the trickiest things with IPv6 though is the fact that it’s pretty different from IPv4. While some of the concepts remains the same, there are some fundamental differences between IPv4 and IPv6, and it’s definitely takes some time to get used into some of the IPv6 basics, including the terms being used. Experienced IPv4 engineers will probably need to change their mindset, and as I stated before, people don’t really like changes...

In this post, I want to highlight the address assignment options available with IPv6, which is in my view one of the most fundamental things in IP networking, and where things are pretty different comparing to IPv4. I am going to assume you have some basic background on IPv6, and while I will cover the theory part I will also show the command line interface and demonstrate some of the configuration options, focusing on SLAAC and stateless DHCPv6. I am going to use a simple topology with two Cisco routers directly connected to each other using their GigabitEthernet 1/0 interface. Both routers are running IOS 15.2(4).

### Let the party started

With IPv6 an interface can have multiple prefixes and IP addresses, and unlike IPv4, all of them are primary. All interfaces will have a Link-Local address which is the address used to implement many of the control plane functions. If you don’t manually set the Link-Local address, one will automatically be generated for you. Note that the IPv6 protocol stack will not become operational on an interface until a Link-Local address was assigned or generated and it passed Duplicate Address Detection (DAD) verification. In Cisco IOS, we will first need to enable IPv6 on the router which is done globally using the _ipv6 unicast-routing_ command. We will then enable IPv6 on the interface using the _ipv6 enable_ command:

```
ipv6 unicast-routing ! interface GigabitEthernet1/0 ipv6 enable !
```

Now IPv6 in enabled on the interface, and we should get a Link-Local address assigned automatically:

```
show ipv6 interface g1/0 | include link IPv6 is enabled, link-local address is FE80::C800:51FF:FE2F:1C
```

### IPv6 address assignment options

A little bit of theory as promised. When it comes to IPv6 address assignment there are several options you can use:

- Static (manual) address assignment - exactly like with IPv4, you can go on and apply the address yourself. I believe this is straight forward and therefore I am not going to demonstrate that.

- Stateless Address Auto Configuration (SLAAC) - nodes listen for ICMPv6 Router Advertisements (RA) messages periodically sent out by routers on the local link, or requested by the node using an RA solicitation message. They can then create a Global unicast IPv6 address by combining its interface EUI-64 (based on the MAC address on Ethernet interfaces) plus the Link Prefix obtained via the Router Advertisement. This is a unique feature only to IPv6 which provides simple "plug & play" networking. By default, SLAAC does not provide anything to the client outside of an IPv6 address and a default gateway. SLAAC is greatly discussed in RFC 4862.

- Stateless DHCPv6 – with this option SLAAC is still used to get the IP address, but DHCP is used to obtain “other” configuration options, usually things like DNS, NTP, etc. The advantage here is that the DHCP server is not required to store any dynamic state information about any individual clients. In case of large networks which has huge number of end points attached to it, implementing stateless DHCPv6 will highly reduce the number of DHCPv6 messages that are needed for address state refreshment.

- Stateful DHCPv6 - functions exactly the same as IPv4 DHCP in which hosts receive both their IPv6 address and additional parameters from the DHCP server. Like DHCP for IPv4, the components of a DHCPv6 infrastructure consist of DHCPv6 clients that request configuration, DHCPv6 servers that provide configuration, and DHCPv6 relay agents that convey messages between clients and servers when clients are on subnets that do not have a DHCPv6 server. You can learn more about DHCP for IPv6 in RFC 3315.

**Note**: The only way to get a default gateway in IPv6 is via a RA message. DHCPv6 does not carry default route information at this time.


### Putting it all together

An IPv6 host performs stateless address autoconfiguration (SLAAC) by default and uses a configuration protocol such as DHCPv6 based on the following flags in the Router Advertisement message sent by a neighboring router:

- Managed Address Configuration Flag, the 'M' flag. When set to 1, this flag instructs the host to use a configuration protocol to obtain stateful IPv6 addresses

- Other Stateful Configuration Flag, the 'O' flag. When set to 1, this flag instructs the host to use a configuration protocol to obtain other configuration settings, e.g., DNS, NTP, etc.

Combining the values of the M and O flags can yield the following:

- Both M and O Flags are set to 0. This combination corresponds to a network without a DHCPv6 infrastructure. Hosts use Router Advertisements for non-link-local addresses and other methods (such as manual configuration) to configure other parameters.

- Both M and O Flags are set to 1. DHCPv6 is used for both addresses and other configuration settings, aka stateful DHCPv6.

- The M Flag is set to 0 and the O Flag is set to 1. DHCPv6 is not used to assign addresses, only to assign other configuration settings. Neighboring routers are configured to advertise non-link-local address prefixes from which IPv6 hosts derive stateless addresses. This combination is known as statless DHCPv6.

### Examining the configuration

#### SLAAC

Client configuration:

```
interface GigabitEthernet1/0 ipv6 address autoconfig ipv6 enable
```

Server configuration:

```
interface GigabitEthernet1/0 ipv6 address 2001:1111:1111::1/64 ipv6 enable
```

We can see the server sending the RA message with the prefix that was configured:

```
ICMPv6-ND: Request to send RA for FE80::C801:51FF:FE2F:1C ICMPv6-ND: Setup RA from FE80::C801:51FF:FE2F:1C to FF02::1 on GigabitEthernet1/0 ICMPv6-ND: MTU = 1500 ICMPv6-ND: prefix = 2001:1111:1111::/64 onlink autoconfig ICMPv6-ND: 2592000/604800 (valid/preferred)
```

And the client receiving the message and calculating an address using EUI-64:

```
ICMPv6-ND: Received RA from FE80::C801:51FF:FE2F:1C on GigabitEthernet1/0 ICMPv6-ND: Prefix : 2001:1111:1111::ICMPv6-ND: Update on-link prefix 2001:1111:1111::/64 on GiabitEthernet1/0 IPV6ADDR: Generating IntfID for 'eui64', prefix 2001:1111:1111::/64 ICMPv6-ND: IPv6 Address Autoconfig 2001:1111:1111:0:C800:51FF:FE2F:1C
```

**R1#show ipv6 interface brief**  
GigabitEthernet1/0 [up/up]  
FE80::C800:51FF:FE2F:1C  
2001:1111:1111:0:C800:51FF:FE2F:1

### Stateless DHCP

Client configuration:

No changes are required on the client side. The client is configured to use SLAAC by setting the "auto-config" option.

```
interface GigabitEthernet1/0 ipv6 address autoconfig ipv6 enable
```

Server configuration:

```
ipv6 dhcp pool STATELESS\_DHCP dns-server 2001:1111:1111::10 domain-name test.com ! interface GigabitEthernet1/0 ipv6 address 2001:1111:11111::1/64 ipv6 enable ipv6 nd other-config-flag ipv6 dhcp server STATELESS\_DHCP
```

We can see the client keeping the same IP address, but now obtaining DNS settings through DHCP:

```
IPv6 DHCP: Adding server FE80::C801:51FF:FE2F:1C IPv6 DHCP: Processing options IPv6 DHCP: Configuring DNS server 2001:1111:1111::10 IPv6 DHCP: Configuring domain name test.com
```
