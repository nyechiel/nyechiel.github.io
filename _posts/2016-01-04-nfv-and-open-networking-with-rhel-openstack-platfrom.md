---
layout: post
title: NFV and Open Networking with RHEL OpenStack Platfrom
date: 2016-01-04 18:18:03.000000000 +02:00
categories:
- Blog
tags:
- Network Virtualization
- NFV
- Open Source
- OpenStack
- Talks
comments_id: 16
permalink: "/blog/2016/01/04/nfv-and-open-networking-with-rhel-openstack-platfrom/"
redirect_from: "/2016/01/04/nfv-and-open-networking-with-rhel-openstack-platfrom/"
---
_(This is a summary version of a talk I gave at [Intel Israel Telecom and NFV event](http://www.telecomnews.co.il/%D7%A2%D7%AA%D7%99%D7%93-%D7%A2%D7%95%D7%9C%D7%9D-%D7%94%D7%A1%D7%9C%D7%95%D7%9C%D7%A8-%D7%9B%D7%A0%D7%A1-%D7%90%D7%99%D7%A0%D7%98%D7%9C-Intel-Israel-Telecom-NFV-event-2015.html) on December 2nd, 2015. Slides are available [here](https://github.com/nyechiel/presentation-slides/blob/master/20151202%20-%20Intel%20Israel%20Telecom%20Event%20-%20NFV%20and%20Open%20Networking.pdf)_).

I was honored to be invited to speak on a local Intel event about Red Hat and what we are doing in the [NFV](http://www.etsi.org/technologies-clusters/technologies/nfv) space. I only had 30 minutes, so I tried to provide a high level overview of our offering, covering some&nbsp;main points:

- Upstream first approach and why we believe it is a fundamental piece in the NFV journey; this is not a marketing pitch but really how we deliver&nbsp;our entire product portfolio
- NFV and OpenStack; I touched on the fact that many service providers are asking for OpenStack-based solutions, and that OpenStack is the de-facto choice for [VIM](https://www.ietf.org/proceedings/88/slides/slides-88-opsawg-6.pdf). That said, there are some limitations today (both cultural and technical) with OpenStack and clearly we have a way to go to make it a better engine for the telco needs
- Full open source approach to NFV; it's not just OpenStack but also other key projects such as [QEMU/KVM](http://wiki.qemu.org/Main_Page), [Open vSwitch](http://openvswitch.org/), [DPDK](http://dpdk.org/), [libvirt](http://libvirt.org/), and the underlying [Linux](https://www.kernel.org/) operating system. It's hard to coordinate across these different communities, but this is what we are trying to do, with active participants on all of those
- Red Hat product focus and alignment with [OPNFV](https://www.opnfv.org/)
- Main use-cases we see in the market (atomic VNFs, vCPE, vEPC) with a design example of vPGW using [SR-IOV](https://thenetworkway.wordpress.com/2015/03/05/red-hat-enterprise-linux-openstack-platform-6-sr-iov-networking-part-i-understanding-the-basics/)
- What telco and NFV specific features were introduced in [RHEL OpenStack Platform](https://www.redhat.com/en/technologies/linux-platforms/openstack-platform) 7 (Kilo) and what is planned for OpenStack Platform 8 (Liberty); as a VIM provider we want to offer&nbsp;our customers and the Network Equipment Providers (NEPs) maximum flexibility for packet processing options with PCI Passthrough, SR-IOV, Open vSwitch and DPDK-accelerated Open vSwitch based solutions.

Thanks to Intel Israel for a very interesting and well-organized event!

&nbsp;

