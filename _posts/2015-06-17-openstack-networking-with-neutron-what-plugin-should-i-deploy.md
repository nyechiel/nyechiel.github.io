---
layout: post
title: 'OpenStack Networking with Neutron: What Plugin Should I Deploy?'
date: 2015-06-17 09:56:20.000000000 +03:00
categories:
- Blog
tags:
- Network Virtualization
- Neutron
- OpenStack
- Overlay Networks
- SDN
- Talks
meta:
  publicize_google_plus_url: https://plus.google.com/+NirYechiel1/posts/1Ee94MWMsAZ
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _thumbnail_id: '80'
  _publicize_job_id: '11756339302'
  _publicize_done_7835650: '1'
  _wpas_done_7830923: '1'
  _edit_last: '30422920'
  geo_public: '0'
  _wpas_skip_7830926: '1'
  _wpas_skip_7830923: '1'
  _wpas_skip_7830917: '1'
permalink: "/2015/06/17/openstack-networking-with-neutron-what-plugin-should-i-deploy/"
---
_(This is a summary version of a talk I gave at OpenStack Israel event on June 15th, 2015. Slides are available_ [_here_](https://github.com/nyechiel/presentation-slides/blob/master/20150629%20-%20Cloud%20Native%20Day%20Tel%20Aviv%20-%20OpenStack%20Networking%20with%20Neutron:%20What%20Plugin%20Should%20I%20Deploy.pdf)).

Neutron is probably one of the most pluggable projects in OpenStack today. The theory is very simple and goes like this: Neutron is providing just an API layer and you have got to choose the backend implementation you want. But in reality, there are plenty of plugins (or drivers) to choose from and the plugin architecture is not always so clear.

The plugin is a critical piece of the deployment and directly affects the feature set you are going to get, as well as the scale, performance, high availability, and supported network topologies. In addition, different plugins offer different approaches for managing and operating the networks.

### So what is a Neutron plugin?

The Neutron API exposed via the Neutron server is splitted into two buckets: the core (L2) API and the API extensions. While the core API consists only of the fundamental Neutron definitions (Network, Subnet, Port), the API extension is where the interesting stuff get to be defined, and where you can deal with constructs like L3 router, provider networks, or L4-L7 services such as FWaaS, LBaaS or VPNaaS.

In order to match this design, the plugin architecture is built out of a “core” plugin (which implements the core API) and one or more “service” plugins (to implement additional “advanced” services defined in the API extensions). To make things more interesting, these advanced network services can also be provided by the core plugin by implementing the relevant extensions.

### What plugins are out there?

There are many plugins out there, each with its own approach. But when trying to categorize them, I found that usually it boils down to “software centric” plugins versus “hardware centric” plugins.

With the software centric ones, the assumption is that the network hardware is general-purpose, and the functionality is offered, as the name implies, with software only. This is where we get to see most of the overlay networking approaches with the virtual tunnel end-points (VTEP) implemented in the Compute/Hypervisor nodes. The requirements from the physical fabric is to provide only basic IP routing/switching. The plugin can use an SDN approach to provision the overly tunnels in an optimal manner, and handle broadcast, unknown unicast and multicast (BUM) traffic efficiently.

With the hardware centric ones, the assumption is that a dedicated network hardware is in place. This is where the traditional network vendors usually offer a combined software/hardware solution taking advantage of their network gear. The advantages of this design is better performance (if you offload certain network function to the hardware) and the promise of better manageability and control of the physical fabric.

### And what is there by default?

There are efforts in the Neutron community to completely separate the API (or control-plane components) from the plugin or actual implementation. The vision is to position Neutron as a platform, and not as any specific implementation. That being said, Neutron was really developed out of the Open vSwitch plugin, and some good amount of the upstream development today is still focused around that. Open vSwitch (with the OVS ML2 driver) is what you get by default, and this is by far the most common plugin deployed in production (see the recent user survey [here](http://superuser.openstack.org/articles/openstack-users-share-how-their-deployments-stack-up)). This solution is not perfect and has pros and cons like any other of the solutions out there.

While Open vSwitch is used on the Compute nodes to provide connectivity for VM instances, some of the key components with this solution are actually not related to Open vSwitch. L3 routing, DHCP, and other services are implemented using dedicated software agents using Linux tools such as network namespaces (ip netns), dnsmasq, or iptables.

### So how one should choose a plugin?

I am sorry, but there is no easy answer here. From my experience, the best way is to develop a methodological approach:

1. Evaluate the default Open vSwitch based solution first. Even if you end up not choosing it for your production environment, it should at least get you familiar with the Neutron constructs, definitions and concepts
&nbsp;  
2. Get to know your business needs, and collect technical requirements. Some key questions to answer:
- Are you building a greenfield deployment?
- What level of interaction is expected with your existing network?
- What type of applications are going to run in your cloud?
- Is self-service required?
- Who are the end-users?
- What level of isolation and security is required?
- What level of QoS is expected?
- Are you building a multi cloud/multi data-center or an hybrid deployment?
3. Test things up yourself. Don’t rely on vendor presentations and other marketing materials

