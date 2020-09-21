# init, code exapmle
## html
```
<a href="link" rel="lightbox">
	any content
</a>
```
where: link - link to photo

## jquery
```
$(document).ready(function($){
  $('a[rel*="lightbox"]').lightbox();
});
```

# group photos
Use attr

```
rel="lightbox[roadtrip]"
```

# notice
Based on Wp Lightbox 2 wordpress plugin 
