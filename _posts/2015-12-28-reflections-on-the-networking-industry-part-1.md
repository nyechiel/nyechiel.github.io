---
layout: post
title: 'Reflections on the networking industry, part 1: Welcome to vendor land'
date: 2015-12-28 16:12:59.000000000 +02:00
categories:
- Blog
- SDN &amp; Open Networking
tags:
- Data Center
- Ethernet
- IP
- Open Source
- Vendor
meta:
  _thumbnail_id: '105'
  publicize_google_plus_url: https://plus.google.com/+NirYechiel1/posts/PVpqL1Lsgnu
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '18187324657'
  _publicize_done_7835650: '1'
  _wpas_done_7830923: '1'
permalink: "/2015/12/28/reflections-on-the-networking-industry-part-1/"
---
I have been involved with networking for quite some time now; I have had the opportunity to design, implement and operate different networks across different environments such as enterprise, data-center, and service provider - which inspired me to create this series of short blog posts exploring the computer networking industry. My view on the history, challenges, hype and reality, and most importantly - what’s next and how we can do better.

Protocols and standards were always a key part of networking and were born out of necessity: we need different systems to be able to talk to each other.

Modern networking suite is built around Ethernet and TCP/IP stack, including TCP, UDP, and ICMP - all riding on top of IPv4 or IPv6. There is a general consensus that Ethernet and TCP/IP won the race against the other alternatives. This is great, right? Well, the problem is not with Ethernet nor the TCP/IP stack, but with their “ecosystem”: a long list of complementary technologies and protocols.

Getting the industry to agree on the base layer 2, layer 3 and layer 4 protocols and their header format was indeed a big thing, but we kind of stopped there. Let's say you have got a standard-based Ethernet link. How would you bring it up and negotiate its speed? And what about monitoring, loop prevention, or neighbor discovery? Except for the very basic, common denominator functionality, vendors came out with their own set of proprietary protocols for solving these issues. Just from the top of my mind: [ISL](http://www.cisco.com/c/en/us/support/docs/lan-switching/8021q/17056-741-4.html), [VTP](http://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3560/software/release/12-2_52_se/configuration/guide/3560scg/swvtp.html), [DTP](http://www.cisco.com/c/en/us/tech/lan-switching/dynamic-trunking-protocol-dtp/index.html), [UDLD](http://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10591-77.html), [PAgP](http://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750x_3560x/software/release/12-2_55_se/configuration/guide/3750xscg/swethchl.html#pgfId-1275628), [CDP](http://www.cisco.com/c/en/us/td/docs/ios/12_2/configfun/configuration/guide/ffun_c/fcf015.html), and [PVST](http://www.cisco.com/en/US/tech/tk389/tk621/tk846/tsd_technology_support_sub-protocol_home.html) are all examples of the “Ethernet ecosystem” from one (!) vendor.

True, you can find standard alternatives for the mentioned protocols today. Vendors are embracing open standards and tend to replace their proprietary implementation with a standard one if available. But why not to start with the standard one to begin with?

If you think that these are just historical examples from a different era, think again. Even today, more and more protocols are being developed and/or adopted by single vendors only. I usually like to point out [MC-LAG](https://en.wikipedia.org/wiki/MC-LAG) as an example of a fairly recent and very common architecture with no standard-based implementation. This feature alone can lead you to choose one vendor (or even one specific hardware model from one vendor) across your entire network, resulting in a perfect vendor lock-in.

