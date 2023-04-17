# Documentaion:

## Navigation Bar:
Links to change the views.

Un-authenticated users can see:
Home/Travel page, Catalog pages, Login page, Register page, About page,

Logged-in users can see:
Home/Travel page, Catalog pages, Create Route page, Logout, Profile page,  About page.

Logout Button – will logout current user.

## Login page:
Expect : email and password.
Validate if fields are empty and if email or password are wrong.
There is link if user is not registered.
After login application navigate to route catalog.

## Register page:
Expect : email, imageUrl, password and confirm password.
Validate if fields are empty, if length of text is less than 5 characters.
Validate if password and confirm password don’t match.
There is link if user is already registered.
After login application navigate to route catalog.

## Home page:
All users have access to home page which content:
Header with navigation , picture, short description with link to Route catalog.
Section which shows 3 random cards from Route catalog.
Section which shows 3 random cards from Place catalog.
All cards are changed on every 5 seconds.
Footer with links for more information.

Logged in users which are not creator can Like the route or place, only once.
Cards shows count of all likes on route/ place.

## Create Route page:
Expect : imageUrl, title, courtry, description.
Validate if fields are empty, if length of text is less than 3 characters.
There is link to route catalog page.
After create application navigate to route catalog.

## Route catalog:
Displays a list of routes in the system.
There is pagination which shows 6 cards per page.
Next and previous buttons change the pages.
There is search form to search route by Country.

Logged in users which are not creator can Like the route or place, only once.
Cards shows count of all likes on route.
Clicking on the route card leads to the details page for the selected route.

## Route Details Page:
All users can see all details of the selected route, Count of likes, cards of all places connected to this route and all comments connected to this route.
Once user click on place card, application will navigate him to Place Details Page.

Logged in users :
All logged in users:
Can add place which is connected to this route.

If user is not owner of this resource:
There is toggle button to Like/ Dislike, this will increase or decrease count of likes.
There is button which add comment to this route.

If user is owner of this resource:
If user is owner of the route he can delete or edit the resource.

## Place catalog:
Displays a list of places in the system.
There is pagination which shows 12 cards per page.
Next and previous buttons change the pages.
There is search form to search route by Country.

Logged in users which are not creator can Like the route or place, only once.
Cards shows count of all likes on place.
Clicking on the place card leads to the details page for the selected place.

## Place Details Page:
All users can see all details of the selected place, Count of likes, picture of the connected Route which is link to the Route. If connected route is deleted picture don’t exist.

Logged in users:
If user is not owner of this resource:
There is toggle button to Like/ Dislike, this will increase or decrease count of likes.

If user is owner of this resource:
If user is owner of the route he can delete or edit the resource.


