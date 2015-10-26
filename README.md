/**
 * This Code was created on Oct 2015
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 * Or Directly make issue on github
 */
@NEXTUPDATE "Please add Mugen and Apigen features"

**0. QUICKSTART**
----------

#### 1. Download This Packages

```
meteor add meteoris:core
meteor add meteoris:theme-admin
meteor add meteoris:user
meteor add meteoris:role
```

#### 2. Create hooked Navbar and Sidebar inside your "root/client/hook" folder

The content of each template is using navbar and sidebar Admin LTE style. Make sure you are using correct theme name "meteoris_themeAdmin_hookNavbar" for sidebar, and "meteoris_themeAdmin_hookSidebar" for navbar.

```
<template name="meteoris_themeAdmin_hookNavbar">
    <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
            {{#if currentUser}}
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/images/user.png" class="user-image" alt="User Image">
                    <span class="hidden-xs">{{currentUser.profile.name}}</span>
                </a>
                <ul class="dropdown-menu">
                    <!-- User image -->
                    <li class="user-header">
                        <img src="/images/user.png" class="img-circle" alt="User Image">
                        <p>
                            {{currentUser.profile.name}}
                        </p>
                    </li>
                    <!-- Menu Footer-->
                    <li class="user-footer">
                        <div class="pull-left">
                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                        </div>
                        <div class="pull-right">
                            <a href="#" id="btnLogout" class="btn btn-default btn-flat">Logout</a>
                        </div>
                    </li>
                </ul>
            </li>
            {{else}}
            <li>
                <a href="/meteoris/user/login">Login</a>
            </li>
            {{/if}}
        </ul>
    </div>
</template>
```
"at root/client/hook/navbar.html"

```
<template name="meteoris_themeAdmin_hookSidebar">
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            {{#if currentUser}}
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="/images/user.png" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>{{currentUser.profile.name}}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            {{/if}}
            <!--search form--> 
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
            <!--/.search form--> 
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">MAIN NAVIGATION</li>
                <!--Uncomment this if you want to use the power of meteoris:role and meteoris:user-->
                <!--{{#if meteoris_roleUserIsInGroup "admin"}}-->
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-gears"></i>
                        <i class="fa fa-angle-left pull-right"></i>
                        <span>Setting</span>                                
                    </a>
                    <ul class="treeview-menu">                        
                        <li><a href="/meteoris/theme-admin/setting"><i class="fa fa-laptop"></i> Theme Admin Setting</a></li>                        
                        <li><a href="/meteoris/user"><i class="fa fa-users"></i> Users Management</a></li>                        
                        <li><a href="/meteoris/user/settings"><i class="fa fa-user"></i> User Settings</a></li>                                         
                        <li><a href="/meteoris/role"><i class="fa fa-flag-o"></i> Role Management</a></li>                                                
                    </ul>
                </li>
                <!--{{/if}}-->
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>        
</template>
```
"at root/client/hook/sidebar.html"

#### 3. Creating Home/Site Page 

Meteoris use simple MVC or MVVM + Modular paradigm to structuring app.
Please use this standard structure to achieve best result when using meteoris.

**3.1. Folder Structure**
```
root/
  meteorusernameorgroup:module/
	client/             # Client folder
	   views/           # Views for html/js files
	lib/                # Both Access folder
	   collections/     # Collections folder
	   controllers/     # Controllers Folder
	   router.js        # Router js file
	server/             # Server folder			   
```

**3.2. Router**
Meteoris using Kadira Flow Router to linking between pages. Because we are using modular technique, assume that we are using my meteor account called "radiegtya" and using module name called "site". So we should make folder under root folder called "radiegtya:site". To use modular router, simply follow this step:

- create router file on "root/radiegtya:site/lib/router.js", and type this code
```
/**
create group routes, so every router has prefix radiegtya
*/
var groupRoutes = FlowRouter.group({
    prefix: '/radiegtya',
    name: 'radiegtya',
});

/**
create the main router called site, and use BlazeLayout render "meteoris_themeAdminMain" from metoris:theme-admin package, and accessing template called "radiegtya_siteIndex"
*/
groupRoutes.route('/site', {
    action: function() {
        BlazeLayout.render('meteoris_themeAdminMain', {content: "radiegtya_siteIndex"});
    },   
});
```
- We are not yet able to use this router, but once you have created the views, you can access this page by calling this route:
```
localhost:3000/radiegtya/site
```

**3.3. Creating Controller for Site** 
Controller actually just a method to be called inside your template js, and this will make your code more modular and readable. 

- Create controller file on "root/radiegtya:site/lib/controller/SiteController.js"
```
/*
create a namespace called Radiegtya.SiteController
*/
Namespace('Radiegtya.SiteController');

/**
Create controller which extends Meteoris Controller
*/
Radiegtya.SiteController = Meteoris.Controller.extend({
	constructor : function() {
            // set default counter at constructor
            Session.setDefault('counter', 0);
        },
        /* passing data to index helpers template */
	index: function() {			        
		//return some value, to be passed on index.js
		return {
		    counter: this.getCounter(),
			myName: "Ega Radiegtya",
			myHobby: "Drinking Coffee"
		};
	},
	getCounter: function(){
		return Session.get("counter");
	},
	setCounter: function(counter){
		Session.set('counter', this.getCounter() + 1);
	}
});
```

**3.4. Creating Views Page for Site** 

- create views index file on "root/radiegtya:site/client/views/index.html". Look at the template naming convention, it use "meteorusername_moduleAction" namespacing, so for this views we are gonna use "radiegtya_siteIndex". Which is "radiegtya" for meteor username, "site" for the module name, and "Index" in camel case after site as action name.
```
<template name="radiegtya_siteIndex">
	<div class="content">
		<div class="box">
			<div class="box-body">
				<button>Click Me</button>
				<p>
				You've pressed the button {{counter}} times.
				</p>
			</div>
		</div>
	</div>
</template>
```
because we are installing meteoris:theme-admin, you can use adminLTE styling and html inside your views html file. We are using meteor example to make You more familiar with the code.

- Don't forget to add the js file for the index. Create this file on "root/radiegtya:site/client/views/index.js"
```
var ctrl = new Radiegtya.SiteController();

/**
In the template helper section we are using index() method to get object return value from controller. It's because index was the action and also the file name suffix. This structure will make You easier to get jobs done, when your team getting bigger and the code getting bigger.
*/
Template.radiegtya_siteIndex.helpers({
	myName: function () {
		return ctrl.index().myName;
	},
	myHobby: function () {
		return ctrl.index().myHobby;
	},	
    counter: function () {
      return ctrl.index().counter;
    }
  });

/**
in the template events, we don't need to use index() method to call any action. Because it just simply method calling through controller.
*/
Template.radiegtya_siteIndex.events({
    'click button': function () {
      //increment the counter when button is clicked
      ctrl.setCounter();      
    }
});
```

Now finally access this route to check your apps.
```
localhost:3000/radiegtya/site
```
Awesome! We are successfully creating our simple app in MVC and Modular way with very easy setup. Ofc with amazing template which is reusable.
You can also use this code to create a meteor package easily.

**3.5. Creating Collection** 
 You can use aldeed:collection2 and aldeed:simple-schema collection here. Future explanation will be comming soon.
  ======== COMING SOON =========

**3.6. Creating Server** 
You can use reywood:publish-composite here. Future explanation coming soon.
  ======== COMING SOON =========

**3.7. Using Meteoris Plugin** 
For now You can refer to the below this Quick Start article.



**1. INSTALLATION**
------------------------
```
meteor add meteoris:core
```

it will also installing it's dependencies, which are:

#### 1.1. meteoris:flash
how to use in your js file:
```
//set flash message example
Meteoris.Flash.set('success', 'Data Successfully added');
Meteoris.Flash.set('danger', 'Data Failed to be added');
```

how to use in your html file:

```
<!-- Simply place this code on your html view anywhere -->
{{> meteoris_flash}}
```

#### **1.2. meteoris:form-validation**
this Meteoris.FormValidation extension depends on collection2 and simpleschema:

```
AccountType = new Mongo.Collection("accountType");

var schemas = new SimpleSchema({
    accountClassId: {
        type: String,
        label: "Kelas Akun",
    },    
});

AccountType.attachSchema(schemas);

```

- how to use in your js helper:

```
    /* show error message on view */
    error: function(field) {
        return Meteoris.FormValidation.error(YourCollectionName, field);
    },
```

- how to use in your html view:

```
        <div class="form-group {{#if error 'name'}}has-error{{/if}}">
            <label for="name" class="control-label">Kelas Akun *</label>
            <input type="text" id="name" value="{{name}}" placeholder="Kelas Akun" class="form-control" autofocus="true">
            <span class="help-block">{{error "name"}}</span>
        </div>

```

#### 1.3. meteoris:formatter
- this Meteoris.Formatter extension used for formatting anything like date, datetime, currency etc
- this require lepozepo:accounting and momentjs:moment to works
- how to use in your html view:
```
{{meteoris_formatter 'the function name' firstParam secondParam}}
```
- available function name:
```
    - date (date, format)
    - dateTime (date, format)
    - elapsedTime (date)
    - currency (value)
    - combodate (date)
    - combodateEmpty (date)
```

#### 1.4. meteoris:grid-view
- this Meteoris.GridView extension used for sorting your table header ascending or descending.
- how to use in your html view:
```
<th id="btnSortName" class="{{meteoris_gridViewSortClass 'name'}}">Name</th>
```
- how to use in your js events:
```
    Template.accountTypeIndex.events = {
        /* sorting by parameter */
        'click #btnSortName': function(e) {
            Meteoris.GridView.sort('name');
        },
    }
```

**2. Install Meteoris Theme Admin (Not Required But It will better to be installed) **
-------------------------------

This current version of meteoris only have 1 theme which is called meteoris:theme-admin.
This theme using popular Admin LTE for it's UI, <a href="">Click here</a> for more info about Admin LTE.

To install this theme, simply add meteor package: 
```
meteor add meteoris:theme-admin
```

#### **How to use**

1. You can do general setting of this theme by targetting this url /meteoris/theme-admin/setting

2. You can easily hook sidebar in html file:

a. In your app client folder, create hook folder and inside it, add this template code. 
b. You can change everything such as loggedin user, global search, and menus inside the template as you wish 

```
<!-- In your app client folder, create hook folder and inside it, add this template code. -->
<!-- You can change everything such as loggedin user, global search, and menus inside the template as you wish -->

<template name="meteoris_themeAdmin_hookSidebar">
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="/images/user.png" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>{{currentUser.profile.name}}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <!--search form--> 
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
            <!--/.search form--> 
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">MAIN NAVIGATION</li>
                <!-- Uncomment this if you want to user meteoris:role functionality -->
                <!--{{#if meteoris_roleUserIsInGroup "admin"}}-->
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-gears"></i>
                        <i class="fa fa-angle-left pull-right"></i>
                        <span>Setting</span>                                
                    </a>
                    <ul class="treeview-menu">                        
                        <li><a href="/meteoris/theme-admin/setting"><i class="fa fa-laptop"></i> Theme Admin Setting</a></li>                        
                        
                        <!-- Install meteoris:role and meteoris:user to be able using this link -->
                        <li><a href="/meteoris/user"><i class="fa fa-users"></i> Users Management</a></li>                        
                        <li><a href="/meteoris/user/settings"><i class="fa fa-user"></i> User Settings</a></li>                                         
                        <li><a href="/meteoris/role"><i class="fa fa-flag-o"></i> Role Management</a></li>                                                
                    </ul>
                </li>
                <!--{{/if}}-->
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>        
</template>
```

3. You can hook navbar too in html file:
a. In your app client folder, create hook folder and inside it, add this template code. 
b. You can change everything such as notification, current logged in user, user profile menu etc inside the template as you wish 

```
<template name="meteoris_themeAdmin_hookNavbar">
    <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/images/user.png" class="user-image" alt="User Image">
                    <span class="hidden-xs">{{currentUser.profile.name}}</span>
                </a>
                <ul class="dropdown-menu">
                    <!-- User image -->
                    <li class="user-header">
                        <img src="/images/user.png" class="img-circle" alt="User Image">
                        <p>
                            {{currentUser.profile.name}}
                        </p>
                    </li>
                    <!-- Menu Footer-->
                    <li class="user-footer">
                        <div class="pull-left">
                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                        </div>
                        <div class="pull-right">
                            <a href="#" id="btnLogout" class="btn btn-default btn-flat">Sign out</a>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

```


**3. Meteoris User (Not Required but it will be better to be installed)**
---------------------------------------------------------------------

- NB: This package depends on Meteoris Theme Admin

#### **You can use this main router:**

'/meteoris/user', 		**#to manage user as admin**
'/meteoris/user/login', 		**#to logged in the user**
'/meteoris/user/register',		**#to registering user**
'/meteoris/user/profile'		**#to updating current logged in user profile**
'/meteoris/user/settings',		**#to setting user oauth account**

**4. Install Meteoris Role (Not Required)**
------------------------

#### **How to use**

#### 1. Check whether current logged in user is in role or not in Collection/Server:

```
//you can use this code on collection-allow or on server
Meteoris.Role.userIsInRole(collection, action);

//example on collection:
MyCollection.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.POST);
    },
    update: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.PUT);
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.DELETE);
    },
});

//example on router
var roleRoutes = FlowRouter.group({
    prefix: '/meteoris/role',
    name: 'meteoris_role',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    if (!Meteoris.Role.userIsInRole("my-collection", Meteoris.Role.GET_ALL)){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

```

#### 2. Check whether current logged in user is in group or not in Collection/Server:

```
//you can use this code on collection-allow or on server
Meteoris.Role.userIsInGroup(groupName);

//example on collection:
MyCollection.allow({
    insert: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    update: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
    remove: function(userId, doc) {
        return Meteoris.Role.userIsInGroup("admin");
    },
});

var roleRoutes = FlowRouter.group({
    prefix: '/meteoris/role',
    name: 'meteoris_role',
    triggersEnter: [authenticating]
});

/* router level validation, only allow user with group "admin" to access this page */
function authenticating() {    
    if (!Meteoris.Role.userIsInGroup("user")){
        Meteoris.Flash.set("danger", "403 Unauthenticated");
        FlowRouter.go("/");
    }
}

```

#### 3. Check whether current logged in user is in role or not in Client template:

```
//you can use this code on client template html
{{#if meteoris_roleUserIsInRole "collectionName" "actionName"}}
<!-- Your logic here -->
{{/if}}

//example on client template html:
{{#if meteoris_roleUserIsInRole "my-collection" "GET_ALL"}}
<li><a href="/my-collection"><i class="fa fa-flag-o"></i> My Collection Menu</a></li>
{{/if}}
```

#### 4. Check whether current logged in user is in group or not in Client template:

```
//you can use this code on client template html
{{#if meteoris_roleUserIsInGroup "groupName"}}
<!-- Your logic here -->
{{/if}}

//example on client template html:
{{#if meteoris_roleUserIsInGroup "admin"}}
<li><a href="/my-collection"><i class="fa fa-flag-o"></i> My Collection Menu</a></li>
{{/if}}

```


