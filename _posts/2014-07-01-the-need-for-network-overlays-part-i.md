---
layout: post
title: The need for Network Overlays – part I
date: 2014-07-01 14:48:15.000000000 +03:00
categories:
- Blog
- Foundations
- SDN and Open Networking
tags:
- Data Center
- Network Virtualization
- OpenStack
- Overlay Networks
- VXLAN
comments_id: 1
permalink: "/blog/2014/07/01/the-need-for-network-overlays-part-i/"
redirect_from: "/2014/07/01/the-need-for-network-overlays-part-i/"
---
The IT industry has gained significant efficiency and flexibility as a direct result of virtualization. Organizations are moving toward a virtual datacenter model, and flexibility, speed, scale and automation are central to their success. While compute, memory resources and operating systems were successfully virtualized in the last decade, primarily due to the x86 server architecture, networks and network services have not kept pace.

## The traditional solution: VLANs

Way before the era of server virtualization, Virtual LANs (or 802.1q VLANs) were used to partition different logical networks (or broadcast domains) over the same physical fabric. Instead of wiring a separate physical infrastructure for each group, VLANs were used efficiently to isolate the traffic from different groups or applications based on the business needs, with a unique identifier allocated to each logical network. For years, a physical server represented one end-point from the network perspective and was attached to an “access” (i.e., untagged) port in the network switch. The access switch was responsible to enforce the VLAN ID as well as other security and network settings (e.g., quality of service). The VLAN ID is a 12-bit field allowing a theoretical limit of 4096 unique logical networks. In practice though, most switch vendors support much lower number to be configured. You should remember that for each active VLAN in a switch, a VLAN database need to be maintained for proper mapping of the physical interfaces and the MAC addresses associated with the VLAN. Furthermore, some vendors would also create a different spanning-tree (STP) instance for each active VLAN on the switch which require additional memory cycles.

VLANs are a perfect solution for small-scale environments, where the number of end-points (and MAC addresses respectively) is small and controlled. With virtualization though, one server, now called hypervisor, can host many virtual machines and many network end-points. As I stated before, the networks have not kept pace, and the easiest (and also rational) thing to do was to reuse the good-old VLANs. We were essentially adding an additional layer of software access switch in the hypervisor to link the different virtual machines on the host, and those server “access” ports in the physical switch that traditionally were untagged, are now expecting tagged traffic with different VLAN IDs differentiating between the virtual machine networks. The main issue here is the fact that the virtual machines MAC addresses must be visible end-to-end throughout the network core. Reminder: VLANs must be properly configured on each switch along the path, as well as on the appropriate interfaces to get end-to-end MAC learning and connectivity.

In a virtualized world, where the number of end-points is constantly increasing and can be very high, VLANs is a limited solution that does not follow one of the main participles beyond virtualization: use of software application to divide one physical resource into multiple isolated virtual environments. Yes, VLANs does offer segmentation of different logical networks (or broadcast domains) over the same physical fabric, but you still need to manually provision the network and make sure the VLANs are properly configured across the network devices. This start to become a management and configuration nightmare and simply does not scale.


## Where network vendors started to be (really) creative

At this point, when there was no doubt that VLANs and traditional L2 based networks are not suitable for large virtualized environments, plenty of network solutions were raised. I don’t really want to go into detail on any of those, but you can look for 802.1Qbg, VM-FEX, FabricPath, TRILL, 802.1ad (QinQ), and 802.1ah (PBB) to name a few. In my view, these are over complicating the network while ignoring the main problem – L2-based solution is a bad thing to begin with, and we should have looked for something completely different (hint: L3 routing is your friend).


### Overlays to the rescue

L3 routing is a scalable and well-known solution (it runs the Internet, isn't it?). With proper planning, routing domains can handle massive number of routes/networks, keeping the broadcast (and failure) domains small. Furthermore, most modern routing operating systems can utilize equal-cost multi-path routing (ECMP), effectively load-sharing the traffic across all available routed links. In contrast, by default spanning-tree protocol (STP) blocks redundant L2 switched links to avoid switching loops, simply because that there is no way to handle loops within a switched environment (there is no “time-to-live” field within an Ethernet frame).

Routing sounds a lot better, but note that L2 adjacency is required by most applications running inside the virtual machines. L2 connectivity between the virtual machines is also required for virtual machine mobility (e.g., _Live Migration_ in VMware terminology). This is where overlay networks enter the picture; an overlay network is a computer network which is built on top of another network. Using an overlay, we can build a L2 switched network on top of a L3 routed network. Don’t get it wrong – overlays are not a new networking concept and are already used extensively to solve many network challenges (see GRE tunneling and MPLS L2/L3 VPNs for some examples and use cases).

In the next post I will bring the second part of this article, diving into the theory behind network overlays and the way they tend to solve the network virtualization case.
