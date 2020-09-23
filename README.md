# code exapmles
## standart init
```
<a href="link-to-image" rel="lightbox">
  any content
</a>
```
```
$(document).ready(function($){
  $('a[rel*="lightbox"]').lightbox();
});
```

## init group photos
Use attr

```
rel="lightbox[id]"
```
where: id - unique id groups images

## init lightbox with scroll
Created specifically for long images layouts. Just add a class to link:

```
lightbox-with-scroll
```
