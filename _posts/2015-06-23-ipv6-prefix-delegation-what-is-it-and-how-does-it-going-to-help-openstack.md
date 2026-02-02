---
layout: post
title: IPv6 Prefix Delegation - what is it and how does it going to help OpenStack?
date: 2015-06-23 02:21:39.000000000 +03:00
categories:
- Blog
- SDN and Open Networking
tags:
- IPv6
- Neutron
- OpenStack
comments_id: 10
permalink: "/blog/2015/06/23/ipv6-prefix-delegation-what-is-it-and-how-does-it-going-to-help-openstack/"
redirect_from: "/2015/06/23/ipv6-prefix-delegation-what-is-it-and-how-does-it-going-to-help-openstack/"
---
IPv6 offers several ways to assign IP addresses to end hosts. Some of them (SLAAC, stateful DHCPv6, stateless DHCPv6) were already covered in [this post](/2014/07/02/ipv6-address-assignment-stateless-stateful-dhcp-oh-my/). The IPv6 Prefix Delegation mechanism (described in [RFC 3769](https://tools.ietf.org/html/rfc3769) and [RFC 3633](https://www.ietf.org/rfc/rfc3633.txt)) provides “a way of automatically configuring IPv6 prefixes and addresses on routers and hosts” - which sounds like yet another IP assignment option. How does it differ from the other methods? And why do we need it? Let’s try to figure it out.

### Understanding the problem

I know that you still find it hard to believe… but IPv6 is here, and with IPv6 there are enough addresses. That means that we can finally design our networks properly and avoid using different kinds of network address translation (NAT) in different places across the network. Clean IPv6 design will use addresses from the Global Unicast Address (GUA) range, which are routable in the public Internet. Since these are globally routed, care needs to be taken to ensure that prefixes configured by one customer do not overlap with prefixes chosen by another.

While SLAAC or DHCPv6 enable simple and automatic host configuration, they do not provide specification to automatically delegate a prefix to a customer site. With IPv6, there is a need to create a hierarchical model in which the service provider allocates prefixes from a set of pools to the customer. The customer then assign addresses to its end systems out of the predefined pool. This is powerful, as it provides the service provider with control over the IPv6 prefixes assignment, and could eliminate potential conflicts in prefix selection.

### How does it work?

With Prefix Delegation, a delegating router (Prefix Delegation Server) delegates IPv6 prefixes to a requesting router (Prefix Delegation Client). The requesting router then uses the prefixes to assign global IPv6 addresses to the devices on its internal interfaces. Prefix Delegation is useful when the delegating router does not have information about the topology of the networks in which the requesting router is located. The delegating router requires only the identity of the requesting router to choose a prefix for delegation. Prefix Delegation is not a new protocol. It is using DHCPv6 messages as defined in [RFC 3633](https://tools.ietf.org/html/rfc3633), thus sometimes referred to as DHCPv6 Prefix Delegation.

DHCPv6 prefix delegation operates as follows:

1. A delegating router (Server) is provided with IPv6 prefixes to be delegated to requesting routers.
2. A requesting router (Client) requests one or more prefixes from the delegating router.
3. The delegating router (Server) chooses prefixes for delegation, and responds with prefixes to the requesting router (Client).
4. The requesting router (Client) is then responsible for the delegated prefixes.
5. The final address allocation mechanism in the local network can be performed with SLAAC or stateful/stateless DHCPv6, based on the customer preference. At this step the key thing is the IPv6 prefix and not how it is delivered to end systems.

### IPv6 in OpenStack Neutron

Back in the Icehouse development cycle, the Neutron “subnet” API [was enhanced](https://review.openstack.org/#/c/52983/) to support IPv6 address assignment options. Reference implementation of this followed at the Juno cycle, where [dnsmasq](https://wiki.archlinux.org/index.php/Dnsmasq) and [radvd](http://www.litech.org/radvd/) processes were chosen to serve the subnets with RAs, SLAAC or DHCPv6.

In the current Neutron implementation, tenants must supply a prefix when creating subnets. This is not a big deal for IPv4, as tenants are expected to pick private IPv4 subnets for their networks and NAT is going to take place anyway when reaching external public networks. For IPv6 subnets that use Global Unicast Address (GUA) format, addresses are globally routable and cannot overlap. There is no NAT or floating IP model for IPv6 in Neutron. And if you ask me, there should not be one. GUA is the way to go. But can we just trust the tenants to configure their IPv6 prefixes correctly? Probably not, and that’s why Prefix Delegation is an important feature for OpenStack.

An OpenStack administrator may want to simplify the process of subnet prefix selection for the tenants by automatically supplying prefixes for IPv6 subnets from one or more large pools of pre-configured IPv6 prefixes. The tenant would not need to specify any prefix configuration. Prefix Delegation will take care of the address assignment.

The code is expected to land in OpenStack Liberty based on this [specification](http://specs.openstack.org/openstack/neutron-specs/specs/kilo/ipv6-prefix-delegation.html). Other than REST API changes, a PD client would need to run in the Neutron router network namespace whenever a subnet attached to that router requires prefix delegation. [Dibbler](http://klub.com.pl/dhcpv6/) is an open-source utility that supports PD client and can be used to provide the required functionality.

