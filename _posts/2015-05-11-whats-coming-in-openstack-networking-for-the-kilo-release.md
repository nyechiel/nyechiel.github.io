---
layout: post
title: What’s Coming in OpenStack Networking for the Kilo Release
date: 2015-05-11 14:42:42.000000000 +03:00
categories:
- Blog
tags:
- IPv6
- Network Virtualization
- Neutron
- OpenStack
meta:
  publicize_google_plus_url: https://plus.google.com/+NirYechiel1/posts/XAYzrif3JpY
  is_reblog: '1'
  post_id: '976'
  blog_id: '59321751'
  reblog_snapshot: "O:8:\"stdClass\":8:{s:5:\"title\";s:60:\"Whatâ\x80\x99s Coming
    in OpenStack Networking for the Kilo Release\";s:4:\"type\";s:4:\"post\";s:9:\"mime_type\";s:0:\"\";s:6:\"format\";b:0;s:12:\"modified_gmt\";s:19:\"2015-05-11
    14:18:52\";s:9:\"permalink\";s:102:\"http://redhatstackblog.redhat.com/2015/05/11/whats-coming-in-openstack-networking-for-the-kilo-release\";s:7:\"content\";s:22332:\"<div
    class=\"reblogged-content\">\n\n<a href=\"https://thenetworkway.files.wordpress.com/2015/05/kilo.png\"><img
    class=\" size-medium wp-image-981 alignright\" src=\"https://thenetworkway.files.wordpress.com/2015/05/kilo.png\"
    alt=\"Kilo\" width=\"300\" height=\"170\" data-originalSrc=\"https://redhatstackblog.files.wordpress.com/2015/05/kilo.png?w=300\"
    data-rehosted=\"1\"></a>OpenStackÂ  Kilo, the 11th release of the open source
    project, was <a href=\"https://www.openstack.org/software/kilo/press-release/\">officially
    released</a> in April, and now is a good time to review some of the changes we
    saw in the OpenStack Networking (Neutron) community during this cycle, as well
    as some of the key new networking features introduced in the project.\r\n<h3>Scaling
    the Neutron development community</h3>\r\nThe Kilo cycle brings two major efforts
    which are meant to better expand and scale the Neutron development community:
    core plugin decomposition and advanced services split. These changes should not
    directly impact OpenStack users but are expected to reduce code footprint, improve
    feature velocity, and ultimately bring faster innovation speed. Letâ\x80\x99s
    take a look at each individually:\r\n<h3>Neutron core plugin decomposition</h3>\r\nNeutron,
    by design, has a pluggable architecture which offers a custom backend implementation
    of the <a href=\"http://developer.openstack.org/api-ref-networking-v2.html\">Networking
    API</a>. The plugin is a core piece of the deployment and acts as the â\x80\x9Cglueâ\x80\x9D
    between the logical API and the actual implementation. As the project evolves,
    more and more plugins were introduced, coming from open-source projects and communities
    (such as <a href=\"http://openvswitch.org/\">Open vSwitch</a> and <a href=\"http://www.opendaylight.org/\">OpenDaylight</a>),
    as well as from various vendors in the networking industry (like Cisco, Nuage,
    Midokura and others). At the beginning of the Kilo cycle, Neutron had dozens of
    plugins and drivers span from core plugins, ML2 mechanism drivers, L3 service
    plugins, and L4-L7 service plugins for FWaaS, LBaaS and VPNaaS - the majority
    of those included directly within the Neutron project repository. The amount of
    code required to review across those drivers and plugins was growing to the point
    where it was no longer scaling. The expectation that core Neutron reviewers review
    code which they had no knowledge of, or could not test due to lack of proper hardware
    or software setup, was not realistic. This also caused some frustration among
    the vendors themselves, who sometimes failed to get their plugin code merged on
    time.\r\n\r\nThe first effort to improve the situation was to decompose the core
    Neutron plugins and ML2 drivers from the Neutron repository. The idea is that
    plugins and drivers will leave only a small â\x80\x9Cshimâ\x80\x9D (or proxy)
    in the Neutron tree, and move all their backend logic out to a different repository,
    with <a href=\"https://github.com/stackforge\">StackForge</a> being a natural
    place for that. The benefit is clear: Neutron reviewers can now focus on reviewing
    core Neutron code, while the vendors and plugin maintainers can now iterate at
    their own pace. While the <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/core-vendor-decomposition.html\">specification</a>
    encouraged vendors to immediately start the decomposition of their plugins, it
    did not require that all plugins complete decomposition in Kilo timeframe, mainly
    to allow enough time for the vendors to complete the process.\r\n\r\nMore information
    on the process is documented <a href=\"http://docs.openstack.org/developer/neutron/devref/contribute.html\">here</a>,
    with <a href=\"http://docs.openstack.org/developer/neutron/devref/contribute.html#decomposition-progress-chart\">this
    section</a> dedicated for tracking the progress of the various plugins.\r\n<h3>Advanced
    services split</h3>\r\nWhile the first effort is focused solely on core Neutron
    plugins and ML2 drivers, a parallel <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/services-split.html\">effort</a>
    was put in place to address similar concerns with the L4-L7 advanced services
    (FWaaS, LBaaS, and VPNaaS). Similar to the core plugins, advanced services previously
    stored their code in the main Neutron repository, resulting in lack of focus and
    reviews by Neutron core reviewers. Starting with Kilo, these services are now
    split into their own repositories; Neutron now includes four different repositories:
    one for basic L2/L3 networking, and one each for FWaaS, LBaaS, and VPNaaS. As
    the number of service plugins is still relatively low, vendors and plugin code
    will remain in each of the service repositories at this point.\r\n\r\nIt is important
    to note here that this change should not affect OpenStack users. Even with the
    services now split, there is no change to the API or CLI interfaces, and they
    are all still using the same Neutron client as before. That said, we do see this
    split laying the foundation for some more deeper changes in the future, with each
    of the services having the potential to become independent from Neutron and offer
    their own REST endpoints, configuration file, and CLI/API client. This will enable
    teams focused exclusively on one or more advanced services to make a bigger impact.\r\n<h3><strong>ML2/Open
    vSwitch port-security</strong></h3>\r\nSecurity-groups are one of the most popular
    Neutron features, allowing tenants to specify the type of traffic and direction
    (ingress/egress) that is allowed to pass through a Neutron port, effectively creating
    a firewall close to the virtual machines (VMs).\r\n\r\nAs a security measure,
    Neutron's security group implementation always applies â\x80\x9Cbonusâ\x80\x9D
    default rules automatically to block <a href=\"http://en.wikipedia.org/wiki/IP_address_spoofing\">IP
    address spoofing</a> attacks, preventing a VM from sending or receiving traffic
    with a MAC or IP address which does not belong to its Neutron port. While most
    users find security-groups and the default anti-spoofing rules helpful and necessary
    to protect their VMs, some asked for the option to turn it off for specific ports.
    This is mainly required in cases where network functions are running within the
    VMs, a common use case for <a href=\"http://www.etsi.org/technologies-clusters/technologies/nfv\">network
    functions virtualization (NFV)</a>.\r\n\r\nThink for example of a router application
    deployed within an OpenStack VM; it receives packets that are not necessarily
    addressed to it and transmits (routes) packets that are not necessarily generated
    from one of its ports. With security-groups applied, it will not be able to perform
    these tasks.\r\n\r\nLetâ\x80\x99s examine the following topology as an example:\r\n\r\n<a
    href=\"https://thenetworkway.files.wordpress.com/2015/05/pic_1-1.jpg\"><img class=\"
    size-medium wp-image-996 aligncenter\" src=\"https://thenetworkway.files.wordpress.com/2015/05/pic_1-1.jpg\"
    alt=\"pic_1-1\" width=\"300\" height=\"47\" data-originalSrc=\"https://redhatstackblog.files.wordpress.com/2015/05/pic_1-1.jpg?w=300\"
    data-rehosted=\"1\"></a>\r\n\r\nHost 1, with the IPv4 address of 192.168.0.1 wants
    to reach Host 2, which is configured with 172.16.0.1. The two hosts are connected
    via two VMs running a router application, and are configured to route between
    the networks and act as default gateways for the hosts. The MAC addresses of the
    relevant ports are shown as well.Now, letâ\x80\x99s examine the traffic flow when
    Host 1 is trying to send traffic to Host 2:\r\n<ol>\n<li>Host 1 generates an IPv4
    packet with a source of <em>168.0.1</em> and a destination of <em>172.16.0.1</em>.
    As the two hosts are placed on different subnets, R1 will respond to Host 1â\x80\x99s
    ARP request with its local MAC address, and <em>3B-2D-B9-9B-34-40</em> will be
    used as the destination MAC on the L2 frame.</li>\r\n</ol>\n<ol start=\"2\">\n<li>R1
    receives the packet. Note that the destination IP of the packet is <strong><em>16.0.1,</em>
    </strong>which is not assigned to R1. With security-groups enabled on R1â\x80\x99s
    port and the default anti-spoofing rules applied, the packet will be dropped at
    this point, and R1 would not be able to route the traffic further.</li>\r\n</ol>\r\nPrior
    to Kilo, you could either disable or enable security-groups for the entire cloud.
    Starting with the Kilo release, it is now possible to enable or disable the security-group
    feature per port using a new <em>port-security-enabled </em>attribute, so that
    the tenant admin can decide if and where a firewall is exactly needed in the topology.
    This new attribute is supported with the Open vSwitch agent (<em>ovs-agent</em>)
    in conjunction with the <em>IptablesFirewallDriver</em>.\r\n<p style=\"text-align:left;\">Going
    back to the previous topology, it is now possible to turn off security-groups
    on the VMs being used as routers, while keeping them active on the Host VM ports,
    so that routing can take place properly:</p>\r\n<a href=\"https://thenetworkway.files.wordpress.com/2015/05/pic_2-2.jpg\"><img
    class=\" size-medium wp-image-997 aligncenter\" src=\"https://thenetworkway.files.wordpress.com/2015/05/pic_2-2.jpg\"
    alt=\"pic_2-2\" width=\"300\" height=\"78\" data-originalSrc=\"https://redhatstackblog.files.wordpress.com/2015/05/pic_2-2.jpg?w=300\"
    data-rehosted=\"1\"></a>\r\n\r\nSome additional information on this feature along
    with a configuration example can be found on this <a href=\"http://blog.otherwiseguy.com/trying-out-the-ml2-port-security-extension/\">blog
    post</a> by Red Hatâ\x80\x99s Terry Wilson.\r\n<h3><strong>IPv6 enhancements</strong></h3>\r\nIPv6
    has been a key area of focus in Neutron lately, with major features introduced
    during the Juno release to allow address assignment for tenant networks using
    <a href=\"https://tools.ietf.org/html/rfc4862\">Stateless Address Autoconfiguration
    (SLAAC)</a> and <a href=\"https://tools.ietf.org/html/rfc3315\">DHCPv6</a>, as
    well as support for provider networks with Router Advertisements (RAs) messages
    generated by an external router. While the IPv6 code base continues to mature,
    the Kilo release brings several other enhancements, including:\r\n<ul>\n<li><span
    style=\"text-decoration:underline;\">The ability to assign multiple IPv6 prefixes
    for a network</span></li>\r\n</ul>\r\nWith IPv6, it is possible to assign several
    IP prefixes to a single interface. This is in fact a common configuration, with
    all interfaces assigned a link-local address (LLA) by default to handle traffic
    in the local link, and one or more global unicast addresses (GUA) for end-to-end
    connectivity. Starting with the Kilo release, users can now attach several IPv6
    subnets to a network. When the subnet type is either SLAAC or DHCPv6 stateless,
    one IPv6 address from each subnet will be assigned to the Neutron port.\r\n<h3><strong>Better
    IPv6 router support</strong></h3>\r\nAs of Kilo, there is no network address translation
    (NAT) or floating IP model for IPv6 in OpenStack. The assumption is that VMs are
    assigned globally routed addresses and can communicate directly using pure L3
    routing. The <em>neutron-l3-agent </em>is the component responsible for routing
    within Neutron, through the creation and maintenance of virtual routers. When
    it comes to IPv6 support in the virtual routers, two main functions are required:\r\n<ol>\n<li>Inter-subnet
    routing: this refers to the ability to route packets between different IPv6 prefixes
    of the same tenant. Since the traffic is routed within the cloud and does not
    leave for any external system this is usually referred to as â\x80\x9Ceast-westâ\x80\x9D
    routing. This is supported since Juno with no major enhancements introduced in
    Kilo.</li>\r\n\t<li>External routing: this refers to the ability to route packets
    between an IPv6 tenant subnet and an IPv6 external subnet. Since the traffic needs
    to leave the cloud to reach the external network this is usually referred to as
    â\x80\x9Cnorth-southâ\x80\x9D traffic. As there is no IPv6 NAT support, the virtual
    router simply needs to route the traffic between the internal subnet and the external
    one. While this capability was supported since the Juno release, Kilo introduces
    major improvements to the way the operator needs to provision and create this
    external network to begin with. It is now not required to create any Neutron subnet
    for the external network. The virtual router can just automatically learn its
    default gateway information via SLAAC (if RAs are enabled on the upstream router),
    or the default route can be manually set by the operator using a new option introduced
    in the <em>l3-agent</em> configuration file (<em>â\x80\x98ipv6-gateway</em>â\x80\x99).</li>\r\n</ol>\n<h3><strong>Extra
    DHCP options</strong></h3>\r\nWith Neutron, users can specify extra DHCP options
    for a subnet. This is mainly used to assign additional information such as Domain
    Name System (DNS) or maximum transmission unit (MTU) size to a given port. Originally,
    this configuration only worked for DHCPv4 or DHCPv6 addresses on a port. This
    configuration causes issues when setting up dual-stack designs, where a VM is
    assigned with both an IPv4 and IPv6 address on the same port.\r\n\r\nStarting
    with Kilo, it is now possible to specify extra DHCP options for both DHCPv4 and
    DHCPv6. A new attribute (â\x80\x98<em>ip_versionâ\x80\x99</em>) is used in Neutron
    port create/update API to specify the IP version (4 or 6) of a given DHCP option.\r\n<h3><strong>LBaaS
    v2 API</strong></h3>\r\nLoad-Balancing-as-a-Service (LBaaS) is one of the advanced
    services of Neutron. It allows tenants to create load-balancers on demand, backed
    by open-source or proprietary service plugins that offer different load balancing
    technologies. The open source solution available with Red Hat Enterprise Linux
    OpenStack Platform is based on the HAProxy service plugin.\r\n\r\n<a href=\"https://wiki.openstack.org/wiki/Neutron/LBaaS/API#OpenStack_LBaaS_API_1.0\">Version
    1.0</a> of the LBaaS API included basic load balancing capabilities and established
    a simple, straight-forward flow for setting up a load balancer services.\r\n<ol>\n<li>Create
    a pool</li>\r\n\t<li>Create one or more members in the pool</li>\r\n\t<li>Create
    health monitors</li>\r\n\t<li>Create a virtual IP (VIP) that is associated with
    the pool</li>\r\n</ol>\r\nThis was useful for getting initial implementations
    and deployments of LBaaS, but it wasnâ\x80\x99t intended to be an enterprise-class
    alternative to a full-blown load-balancer. <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/lbaas-api-and-objmodel-improvement.html\">LBaaS
    version 2.0</a> adds capabilities to offer a more robust load-balancing solution,
    including support for <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/lbaas-tls.html\">SSL/TLS
    termination</a>. Accomplishing this required a redesign of the LBaaS architecture,
    along with the <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/lbaas-refactor-haproxy-namespace-driver-to-new-driver-interface.html\">HAProxy
    reference plugin</a>.\r\n<h3><strong>Distributed Virtual Routing (DVR) VLAN support</strong></h3>\r\nDVR,
    first introduced in Juno release, allows the deployment of Neutron routers across
    the Nova Compute nodes, so that each Compute node handles the routing for its
    locally hosted VMs. This is expected to result in better performance and scalability
    of the virtual routers, and is seen as an important milestone towards a more efficient
    L3 traffic flow in OpenStack.\r\n\r\nAs a reminder, the default OpenStack architecture
    with Neutron involves a dedicated cluster of Network nodes that handles most of
    the network services in the cloud, including DHCP, L3 routing, and NAT. That means
    that traffic from the Compute node must reach the Network nodes to get routed
    properly. With DVR, the Compute node can handle itself inter-subnet (east-west)
    routing as well as NAT for floating IPs. DVR still relies on dedicated Network
    nodes for the default SNAT service, which allows basic outgoing connectivity for
    VMs.\r\n\r\nPrior to Kilo, distributed routers only supported overlay tunnel networks
    (i.e. GRE, VXLAN) for tenant separation. This hindered the adoption of the feature
    as many clouds opted to use 802.1Q VLAN tenant networks. With Kilo, this configuration
    is now possible and distributed routers may service tunnel networks as well as
    VLAN networks.\r\n\r\nTo get more information about DVR, I strongly recommended
    reading this great three part post from Red Hatâ\x80\x99s Assaf Muller, covering:
    <a href=\"http://assafmuller.com/2015/04/15/distributed-virtual-routing-overview-and-eastwest-routing/\">overview
    and east/west routing</a>, <a href=\"http://assafmuller.com/2015/04/15/distributed-virtual-routing-snat/\">SNAT</a>,
    and <a href=\"http://assafmuller.com/2015/04/15/distributed-virtual-routing-floating-ips/\">Floating
    IPs</a>.\r\n<h3><strong>View the state of Highly Available routers</strong></h3>\r\nOne
    of the major features introduced in the Juno release was the L3 High Availability
    (L3 HA) solution, which allowed an active/active setup of the <em>neutron-l3-agent
    </em>across different Network nodes. The solution, based on <a href=\"http://www.keepalived.org/\"><em>keepalived</em></a><em>,
    </em>utilizes the <a href=\"https://tools.ietf.org/html/rfc3768\">Virtual Router
    Redundancy Protocol (VRRP)</a> protocol internally for forming groups of highly
    available virtual routers. By design, for each group there is one active router
    (which forwards traffic), and one or more standby routers (which are waiting to
    take control in case of a failure of the active one). The scheduling of master/backup
    routers is done randomly across the different Network nodes, so that the load
    (i.e. forwarding router instances) is spread among all nodes.\r\n\r\nOne of the
    limitations of the Juno-based solution was that Neutron had no way to report the
    HA router state, which made troubleshooting and maintenance harder. With Kilo,
    operators may now run the <em>neutron l3-agent-list-hosting-router &lt;router_id&gt;</em>
    command and see where the active instance is currently hosted.\r\n<h3 style=\"text-align:left;\">\n<a
    href=\"https://thenetworkway.files.wordpress.com/2015/05/pic_3-3.jpg\"><img class=\"alignnone
    size-medium wp-image-1000 aligncenter\" src=\"https://thenetworkway.files.wordpress.com/2015/05/pic_3-3.jpg\"
    alt=\"pic_3-3\" width=\"300\" height=\"131\" data-originalSrc=\"https://redhatstackblog.files.wordpress.com/2015/05/pic_3-3.jpg?w=300\"
    data-rehosted=\"1\"></a>Ability to choose a specific floating IP</h3>\r\n<a href=\"https://www.rdoproject.org/Difference_between_Floating_IP_and_private_IP\">Floating
    IPs</a> are public IPv4 addresses that can be dynamically added to a VM instance
    on the fly, so that the VM can be reachable from external systems, usually the
    Internet. Originally, when assigning a floating IP for a specific VM, the IP would
    be randomly picked from a pool and there was no guarantee that a VM would consistently
    receive the same IP address. Starting with Kilo, the user can now choose a specific
    floating IP address to be assigned to a given VM by utilizing a new â\x80\x98<em>floating_ip_address</em>â\x80\x99
    API attribute.\r\n<h3><strong>MTU advertisement functionality</strong></h3>\r\nThis
    <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/mtu-selection-and-advertisement.html\">new
    feature</a> allow specification of the desired MTU for a network, and advertisement
    of the MTU to guest operating systems when it is set. This new capability will
    avoid MTU mismatches in networks that lead to undesirable results such as connectivity
    issues, packet drops and degraded network performance.\r\n<h3>Â <strong>Improved
    performance and stability </strong>\n</h3>\r\nThe OpenStack Networking community
    is actively working to make Neutron a more stable and mature codebase. Among the
    different performance and stability enhancements introduced in Kilo, I wanted
    to highlight two: the switch to use <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/vsctl-to-ovsdb.html\">OVSDB
    directly</a> with the ML2/Open vSwitch plugin instead of using Open vSwitch <a
    href=\"http://openvswitch.org/support/dist-docs/ovs-vsctl.8.txt\"><em>ovs-vsctl</em></a>
    CLI commands, and comprehensive <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/restructure-l3-agent.html\">refactoring
    of the</a> <a href=\"http://specs.openstack.org/openstack/neutron-specs/specs/kilo/restructure-l3-agent.html\">l3-agent</a>
    code base.\r\n\r\nWhile these two changes are not introducing any new feature
    functionality to users per se, they do represent the continuous journey of improving
    Neutronâ\x80\x99s code base, especially the core L2 and L3 components which are
    critical to all workloads.\r\n<h3><strong>Looking ahead to Liberty</strong></h3>\r\n<a
    href=\"http://superuser.openstack.org/articles/openstack-crowns-liberty-its-next-release-name\">Liberty</a>,
    the next release of OpenStack, is <a href=\"https://wiki.openstack.org/wiki/Liberty_Release_Schedule\">planned
    for October 15th, 2015</a>. We are already busy planning and finalizing the sessions
    for the <a href=\"https://libertydesignsummit.sched.org/\">Design Summit</a> in
    Vancouver, where new feature and enhancement proposals are scheduled to be discussed.
    You can view the approved Neutron <a href=\"https://github.com/openstack/neutron-specs/tree/master/specs/liberty\">specifications
    for Liberty</a> to track what proposals are accepted to the project and expected
    to land in Liberty.\r\n<h3><strong>Get Started with OpenStack Neutron</strong></h3>\r\nIf
    you want to try out OpenStack, or to check out some of the above enhancements
    for yourself, you are welcome to visit our <a href=\"https://openstack.redhat.com/Main_Page\">RDO</a>
    site. We have <a href=\"https://openstack.redhat.com/Docs\">documentation to help
    get you</a> <a href=\"https://openstack.redhat.com/Docs\">started,</a> <a href=\"https://openstack.redhat.com/forum/\">forums</a>
    where you can connect with other users, and <a href=\"https://openstack.redhat.com/Quickstart\">community-supported
    packages</a> of the most up-to-date OpenStack releases available for download.\r\n\r\nIf
    you are looking for enterprise-level support and our partner certification program,
    Red Hat also offers <a href=\"http://www.redhat.com/openstack/\">Red Hat Enterprise
    Linux OpenStack Platform</a>.\r\n\r\n \r\n\r\n \r\n<pre><em>\r\nThe Kilo logo
    is a trademark/service mark of the OpenStack Foundation. \r\nRed Hat is not affiliated
    with, endorsed or sponsored by the OpenStack \r\nFoundation, or the OpenStack
    community.\r\nImage source: https://www.openstack.org/software/kilo/</em></pre>\n</div>\";s:15:\"images_mirrored\";i:4;}"
  publicize_facebook_url: https://facebook.com/
  _wpas_done_7830923: '1'
  _publicize_done_external: a:1:{s:11:"google_plus";a:1:{s:21:"104924302021381005768";b:1;}}
  publicize_linkedin_url: ''
  _edit_last: '30422920'
  geo_public: '0'
  _wpas_skip_7830926: '1'
  _wpas_skip_7830923: '1'
  _wpas_skip_7830917: '1'
  _publicize_job_id: '18407563672'
permalink: "/2015/05/11/whats-coming-in-openstack-networking-for-the-kilo-release/"
---
A post I wrote for the Red Hat Stack blog on what’s coming in OpenStack Networking for the Kilo release. Check it out [here](https://www.redhat.com/en/blog/whats-coming-openstack-networking-kilo-release).

