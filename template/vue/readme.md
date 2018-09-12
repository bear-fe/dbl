
## You can use

### CSS

* position: fixed
* Counters
* display: table; display: table-*; display: inline-table

#### ::selection CSS pseudo-element

``` css
::-moz-selection {
  background: #b3d4fc;
  text-shadow: none;
}

::selection {
  background: #b3d4fc;
  text-shadow: none;
}
```

#### CSS 2.1 selectors

* :first-child
* E > F, 子元素选择器
* E + F, 相邻兄弟元素选择器
* [attr], [attr="val"], [attr~="val"], [attr|="bar"], 属性选择器

#### CSS inline-block

display: inline-block

#### CSS3

##### CSS3 selectors

* [attr^="bar"], [attr$="bar"], [attr*="bar"]
* :root
* :nth-child(), :nth-last-child(), :last-child, :only-child
* :nth-of-type(), :nth-last-of-type(), :first-of-type, :last-of-type, :only-of-type
* :empty
* :target
* :enabled, :disabled
* :checked
* :not()
* E ~ F

##### CSS3 box-sizing

box-sizing: border-box

##### CSS3 border-raidus

border-radius: 10px

##### CSS3 box-shadow

##### CSS3 opacity

``` css
opacity: .7;
```

CSS3 Media Queries

``` css
@media (min-width: 768px) {
  .selector {
    color: red;
  }
}
```

##### CSS3 Colors

rgba(), hsl(), hsla()

### JavaScript

#### JSON

* JSON.parse()
* JSON.stringify()

#### Web Storage

### Other

#### PNG alpha transparency

保存为 png24 格式

#### Canvas
