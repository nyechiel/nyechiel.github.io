---
layout: page
title: Home
heading: "Hi, I'm Nir Yechiel."
description: "Nir Yechiel's personal website — writing about product engineering, technology, and people."
---

<div class="home-intro" markdown="1">

I am a product manager at Red Hat, building agentic AI systems that reimagine how enterprise teams work. Previously led engineering teams on OpenShift Networking (Submariner, Service Mesh, Gateway API, Service Interconnect) and held engineering and product roles at Red Hat, Facebook (Meta), and Cisco.

</div>

{% assign featured = site.posts | where: "featured", true | first %}
{% if featured %}
<div class="featured-card">
  {% if featured.image %}
  <a href="{{ featured.url }}" class="featured-card__image-link">
    <img src="{{ featured.image.path | default: featured.image }}" alt="{{ featured.image.alt | default: featured.title }}" class="featured-card__image" />
  </a>
  {% endif %}
  <div class="featured-card__body">
    <span class="featured-card__label">Featured</span>
    <h2 class="featured-card__title"><a href="{{ featured.url }}">{{ featured.title }}</a></h2>
    <p class="featured-card__excerpt">{{ featured.excerpt | strip_html | truncatewords: 40 }}</p>
    {% if featured.tags.size > 0 %}
    <ul class="post-tags">
      {% for tag in featured.tags %}
      <li><a href="/tags/#{{ tag | slugify }}" class="post-tag post-tag--link">{{ tag }}</a></li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
</div>
{% endif %}

## Latest Posts

{% assign post_limit = 3 %}{% if featured %}{% assign post_limit = 4 %}{% endif %}
{% for post in site.posts limit:post_limit %}{% if featured and post.id == featured.id %}{% continue %}{% endif %}
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
