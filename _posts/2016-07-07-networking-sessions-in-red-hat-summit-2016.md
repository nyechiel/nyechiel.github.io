---
layout: post
title: Networking sessions in Red Hat Summit 2016
date: 2016-07-07 01:31:31.000000000 +03:00
categories:
- SDN and Open Networking
- Talks
tags:
- Ansible
- Linux
- NFV
- OpenStack
- Red Hat
- Red Hat Summit
- SDN
- Talks
- Virtualization
comments_id: 18
permalink: "/blog/2016/07/07/networking-sessions-in-red-hat-summit-2016/"
redirect_from: "/2016/07/07/networking-sessions-in-red-hat-summit-2016/"
---
I recently attended the Red Hat Summit 2016 event that took place at San Francisco, CA, on June 27-30. Red Hat Summit is a great place to interact with customers, partners, and product leads, and learn about Red Hat and the company's direction. While Red Hat is still mostly known for its Enterprise Linux (RHEL) business, it also offers products and solutions in the cloud computing, virtualization, middleware, storage, and systems management spaces. And networking is really a key piece in all of these.

In this short post I wanted to highlight a few sessions which are relevant to networking and were presented during the event. While video recordings are not available, slide decks were originally available for download from the event platform, which has since been decommissioned.

## Software-defined networking (SDN) fundamentals for NFV, OpenStack, and containers
- Session overview: With software-defined networking (SDN) gaining traction, administrators are faced with technologies that they need to integrate into their infrastructure. Red Hat Enterprise Linux offers a robust foundation for SDN implementations that are based on an open source standard technologies and designed for deploying containers, OpenStack, and network function virtualization (NFV). We'll dissect the technology stack involved in SDN and introduce the latest Red Hat Enterprise Linux options designed to address the packet processing requirements of virtual network functions (VNFs), such as Open vSwitch (OVS), single root I/O virtualization (SR-IOV), PCI Passthrough, and DPDK accelerated OVS.
- *(Slides no longer available)*


### Use Linux on your whole rack with RDO and open networking
- Session overview: OpenStack networking is never easy--each new release presents new challenges that are hard to keep up with. Come see how open networking using Linux can help simplify and standardize your RDO deployment. We will demonstrate spine/leaf topology basics, Layer-2 and Layer-3 trade-offs, and building your deployment in a virtual staging environment--all in Linux. Let us demystify your network.
- *(Slides no longer available)*


#### Extending full stack automation to the physical network
- Session overview: In this session, we'll talk about the unique operational challenges facing organizations considering how to encompass the physical network infrastructure when implementing agile practices. We'll focus on the technical and cultural challenges facing this transition, including how Ansible is uniquely architected to serve as the right foundational framework for powering this change. We'll touch on why it's more important than ever that organizations embrace the introduction of new automated orchestration capabilities and start moving away from traditional command and control network device administration being done hop by hop. You'll see some some of the theories in action and touch on expanding configuration automation to include elements of state validation of configuration changes. Finally, we'll touch on the changing role of network engineering and operations teams and why their expertise is needed now more than ever to lead this transition.
- *(Slides no longer available)*


#### Best practices for deploying and scaling Red Hat OpenStack Platform with Open vSwitch and Red Hat Ceph storage
- Session overview: In this deep dive implementation session, you'll learn how to successfully deploy and scale Red Hat OpenStack Platform with Red Hat's best practices for integration of Open vSwitch and Red Hat Ceph Storage, taking into consideration high availability, IPv6 networking, and the deployment and usage of Director for massive scalability. Learn the tips and tricks, while avoiding typical pitfalls to ensure you're successful.
- *(Slides no longer available)*


#### Telco breakout: Reliability, availability, and serviceability at cloud scale
- Session overview: Many operators are faced with fierce market competition that is attracting their customers with personalized alternatives. Technologies, like SDN, NFV, and 5G, hold the key to adapting to the networks of the future. However, operators are also looking to ensure that they can continue to offer the service-level guarantees their customers expect.With the advent of cloud-based service infrastructures, building secure, fault-tolerant, and reliable networks that deliver five nines (99.999%) service availability in the same way they have done for years has become untenable. The goal of zero downtime is still the same, as every hour of it is costly to service providers and their customers. As&nbsp;we continually move to new levels of scale, service providers and their customers expect that infrastructure failures will occur and are pro-actively changing their development and operational strategies.&nbsp;This session will explore these industry challenges and how service providers are applying new technologies and approaches to achieve reliability, availability, and serviceability at cloud scale. Service providers and vendors will join us to share their views on this complex topic and explain how they are applying and balancing the use of open source innovations, resilient service and application software, automation, DevOps, service assurance, and analytics to add value for their customers and business partners.
- *(Slides no longer available)*


#### Red Hat Enterprise Linux roadmap
- Session overview: Red Hat Enterprise Linux is the premier Linux distribution, known for reliability, security, and performance. Red Hat Enterprise Linux is also the underpinning of Red Hat's efforts in containers, virtualization, Internet of Things (IoT), network function virtualization (NFV), Red Hat Enterprise Linux OpenStack Platform, and more. Learn what's new and emerging in this powerful operating system, and how new function and capability can help in your environment.
- *(Slides no longer available)*


#### Repeatable, reliable OpenStack deployments: Pipe dream or reality?
- Session overview: Deploying OpenStack is an involved, complicated, and error-prone process, especially when deploying a physical Highly Available (HA) cluster with other software and hardware components, like Ceph. Difficulties include everything from hardware selection to the actual deployment process. Dell and Red Hat have partnered together to produce a solution based on Red Hat Enterprise Linux OSP Director that streamlines the entire process of setting up an HA OpenStack cluster. This solution includes a jointly developed reference architecture that includes hardware, simplified Director installation and configuration, Ceph storage backed by multiple back ends including Dell SC and PS series storage arrays, and other enterprise features--such as VM instance HA and networking segregation flexibility. In this session, you'll learn how this solution drastically simplifies standing up an OpenStack cloud.
- *(Slides no longer available)*


#### Running a policy-based cloud with Cisco Application Centric Infrastructure, Red Hat OpenStack, and Project Contiv
  - Session overview: Infrastructure managers are constantly asked to push the envelope in how they deliver cloud environments. In addition to speed, scale, and flexibility, they are increasingly focused on both security and operational management and visibility as adoption increases within their organizations. This presentation will look at ways Cisco and Red Hat are partnering together to deliver policy-based cloud solutions to address these growing challenges. We will discuss how we are collaborating in the open source community and building products to based on this collaboration. It will cover topics including:
    - Group-Based Policy for OpenStack
    - Cisco Application Centric Infrastructure (ACI) with Red Hat OpenStack
    - Project Contiv and its integration with Cisco ACI
  - *(Slides no longer available)*
