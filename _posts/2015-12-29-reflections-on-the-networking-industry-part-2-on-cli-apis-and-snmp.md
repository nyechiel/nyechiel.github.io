---
layout: post
title: 'Reflections on the networking industry, part 2: On CLI, APIs and SNMP'
date: 2015-12-29 19:10:15.000000000 +02:00
categories:
- Blog
- SDN and Open Networking
tags:
- API
- Automation
- CLI
- NETCONF
- Open Source
- REST
- SNMP
- Vendor
comments_id: 13
permalink: "/2015/12/29/reflections-on-the-networking-industry-part-2-on-cli-apis-and-snmp/"
---
In the [previous post](/2015/12/28/reflections-on-the-networking-industry-part-1/) I briefly described the fact that many networks today are closed and vertically designed. While standard protocols are being adopted by vendors, true interoperability is still a challenge. Sure, you can bring up a BGP peer between platforms from different vendors and exchange route information (otherwise we couldn’t scale the Internet), but management and configuration is still, in most cases, vendor specific.

Every network engineer out there got to respect the [CLI](https://en.wikipedia.org/wiki/Command-line_interface). We sometimes love them and sometimes hate them, but we all tend to master them. The glorious way of interacting with a network device, even in 2015. Some common properties of CLIs are:

1. They are vendor, and sometimes even device, specific;
2. They are not standardized; there is no standard for setting up the data or for displaying the text
3. They don’t have a strict notion of versioning or guarantee backward compatibility;
4. They can change between software releases;

All of the above make CLIs an acceptable solution up to a certain scale. With large-scale networks automation is a key part and usually mandatory. But giving the properties mentioned above, automating a network device configuration based on CLI commands isn’t a trivial task.

Today, you can see more and more vendors that support other protocols such as [NETCONF](https://tools.ietf.org/html/rfc6241) or [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) for interacting with their devices. The impression is that you suddenly have a proper [API](https://en.wikipedia.org/wiki/Application_programming_interface) and a standard method to communicate with the devices. Reality is that with such protocols you do have a standard _transport_ to interact with a device, but you still _do not have an API_, with each device/vendor still represents data differently as brilliantly described by Jason Edelman in [this blog post](http://jedelman.com/home/openconfig-data-models-and-apis/).

We, as an industry, must agree on a standard way for representing the network data. No more vendor-specific implementations, but true, open, models. The last major try was with [SNMP](https://tools.ietf.org/html/rfc3413), the Simple Network Management Protocol, which is anything but simple. Most people just turn it off, or use it to capture (read: poll) very basic information from a device. Anything more complex than that, not to mention device configuration, requires installation of vendor specific [MIBs](https://en.wikipedia.org/wiki/Management_information_base) and we are back to the same problem.

