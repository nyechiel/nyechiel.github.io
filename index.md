---
layout: page
title: Home
heading: "Hi, I'm Nir Yechiel."
description: "Nir Yechiel's personal website — writing about product engineering, technology, and people."
---

<div class="home-intro" markdown="1">

I am a product manager at Red Hat, building agentic AI systems that reimagine how enterprise teams work. Previously led engineering teams on OpenShift Networking (Submariner, Service Mesh, Gateway API, Service Interconnect) and held engineering and product roles at Red Hat, Facebook (Meta), and Cisco.

</div>

## Latest Posts

{% for post in site.posts limit:3 %}
<small>{{ post.date | date: "%B %-d, %Y" }}</small>

**[{{ post.title }}]({{ post.url }})**

{{ post.excerpt | strip_html | truncatewords: 30 }}

{% endfor %}

[View All Posts →](/blog/)

## Podcasts

Check out [podcast episodes](/podcasts/) I have been featured in.

## About

Learn more [about me](/about/) and this site.
