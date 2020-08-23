# react nested dropdown

React component for nested dropdown menus (inspired by youtube and facebook setting menus)

Preview:

![preview](github_images/preview.gif?raw=true)


Simple usage:

```
<DropdownMenu Button={ButtonTest2}>
    <DropdownItem title="Copy" />
    <DropdownItem title="Remove" onClick={() => { console.log("clicked remove") }} />
</DropdownMenu>
```

With nested menus:
```
<DropdownMenu Button={ButtonTest}>
    <DropdownSubMenu>
        <DropdownItem title="Item #1" onClick={() => { console.log("clicked item #1") }} />
        <DropdownItem title="Languge" switchToMenu="language" />
        <DropdownItem title="Themes" switchToMenu="themes" />
    </DropdownSubMenu>
    <DropdownSubMenu menuKey="themes" >
        <DropdownItem title="Theme #1" onClick={() => { console.log("clicked theme #1") }} />
        <DropdownItem title="Theme #2" />
        <DropdownItem title="Theme #3" />
    </DropdownSubMenu>
    <DropdownSubMenu menuKey="language" >
        <DropdownItem title="English" />
        <DropdownItem title="French" />
    </DropdownSubMenu>
</DropdownMenu>
```
