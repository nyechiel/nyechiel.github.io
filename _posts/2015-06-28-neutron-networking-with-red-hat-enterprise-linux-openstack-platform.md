---
layout: post
title: Neutron networking with Red Hat Enterprise Linux OpenStack Platform
date: 2015-06-28 17:45:59.000000000 +03:00
categories:
- Blog
tags:
- IPv6
- Neutron
- OpenStack
- SDN
- Talks
- VXLAN
comments_id: 11
permalink: "/blog/2015/06/28/neutron-networking-with-red-hat-enterprise-linux-openstack-platform/"
redirect_from: "/2015/06/28/neutron-networking-with-red-hat-enterprise-linux-openstack-platform/"
---
_(This is a summary version of a talk I gave at_ [_Red Hat Summit_](http://www.redhat.com/summit/) _on June 25th, 2015. [Slides are available on GitHub](https://github.com/nyechiel/presentation-slides/blob/master/20150625%20-%20Red%20Hat%20Summit%202015%20-%20Neutron%20networking%20with%20Red%20Hat%20Enterprise%20Linux%20OpenStack%20Platform.pdf))._

I was honored to speak the second time in a row on Red Hat Summit, the premier open source technology event hosted in Boston this year. As I am now focusing on product management for networking in [Red Hat Enterprise Linux OpenStack Platform](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux_OpenStack_Platform/) I presented Red Hat’s approach to Neutron, the OpenStack networking service.

Since OpenStack is fairly a new project and a new product on Red Hat’s portfolio, I was not sure what level of knowledge to expect from my audience. Therefore I have started with a fairly basic overview of Neutron - what it is and what are some of the common features you can get from its [API](http://developer.openstack.org/api-ref-networking-v2.html) today. I was very happy to see that most of the people at the audience seemed to be already familiar with OpenStack and with Neutron so the overview part was quick.

The next part of my presentation was a deep dive into Neutron when deployed with the ML2/Open vSwitch (OVS) plugin. This is our default configuration when deploying Red Hat Enterprise Linux OpenStack Platform today, and like any other Red Hat products, based on fully open-source components. Since there is so much to cover here (and I only had one hour for the entire talk), I focused on the core elements of the solution, and the common features we see customers using today: L2 connectivity, L3 routing and NAT for IPv4, and DHCP for IP address assignment. I explained the theory of operation and used some graphics to describe the backend implementation and how things look on the OpenStack nodes.

OVS-based solution is our default, but we are also working with a very large number of leading vendors in the industry providing their own solutions through the use of Neutron plugins. I spent some time to describe the various plugins out there, our current partner ecosystem, and Red Hat’s certification program for 3rd party software.

I then covered some of the major recent enhancements introduced in Red Hat Enterprise Linux OpenStack Platform 6 based on the upstream Juno code base: IPv6 support, L3 HA, and distributed virtual router (DVR) - which is still a [Technology Preview](https://access.redhat.com/support/offerings/techpreview) feature, yet very interesting to our customers.

Overall, I was very happy with this talk and with the number of questions I got in the end. It looks like OpenStack is happening, and more and more customers are interested to find out more about it. See you next year in San Francisco for Red Hat Summit 2016!

