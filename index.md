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

<div class="subscribe-card">
  <p class="subscribe-card__text">Like what you're reading? Get new posts straight to your inbox.</p>
  <form class="subscribe-card__form" action="https://api.follow.it/subscription-form/clBXWVBSbWJyanNERlN2VVRGTUNNdU1uSTF3b1hLRTBGcStIa282RFpaWEVpOVNuOXhieituSC9mVENiTUYzYmRXK25PVVRJM2ZGd3Z0NGVuc0N2R1gxa1lOK1A2S1FrRTEzVXhkZjBvb0xhN2d4L2QxOHpiZ0l1N3V3NmZyRmV8RDY2VzhJN1NzSTJsUyt4L0xTYlJiSkgvUnV6QVdjWjBTem9PQXRFNjBlYz0=/8" method="post">
    <input class="subscribe-card__input" type="email" name="email" placeholder="your@email.com" required />
    <button class="subscribe-card__button" type="submit">Subscribe</button>
  </form>
</div>

## Podcasts

Check out [podcast episodes](/podcasts/) I have been featured in.

## About

Learn more [about me](/about/) and this site.
