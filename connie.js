let currentTab = "";
var user = null;

function displayHomePage() {
    var homePage = document.getElementById('homePage');
    var pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = homePage.innerHTML;
}

function displayItems() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items"
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
        var items = JSON.parse(xhr.responseText);
        var content = '';
        const displayTitle = document.getElementById('displaySearch');
        content = displayTitle.innerHTML + content;

        var pageContent = document.getElementById('pageContent');
        document.getElementById('homePage').style.display = "none";
        pageContent.innerHTML = content + '<div id="displayItems">' + renderResult(items) + '</div>';
    }
    xhr.send();
}

function search() {
    var searchTerm = document.getElementById('search').value;
    var uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + searchTerm;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
        var items = JSON.parse(xhr.responseText);

        var searchResult = document.getElementById('searchResult');

        searchResult.innerHTML = renderResult(items);

        if (items.length == 0) {
            var pageContent = document.getElementById('searchResult'); ///////////
            pageContent.innerHTML += '<div style = "margin-top: 1%">No such item exists</div>';
        }

        document.getElementById('displayItems').style.display = "none"; ////////

    }
    xhr.send();

}

function renderResult(items) {
    var content = '';
    content += "<table style ='margin-top: -2%;border-collapse: collapse;'>";
    var i
    for (i = 0; i < items.length; i++) {
        var itemsid = items[i].ItemId;
        var description = items[i].Description;
        var title = items[i].Title;
        var img = '<img src= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=' + itemsid + '" alt="displaypicture" id="picture" width="220px" height="140px">';

        content += "<tr " + 'style="border-bottom: 1px solid black;">';
        content += "<td><br></br><strong>" + title + "</strong><br/>" + img + "<br></br></td>";
        content += "<td " + 'style = "padding-left:1em">' + description + "</td>";
        content += '</tr>';
    }
    content += "</table>";
    return content;
}

function displayNews() {
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news"
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
        var items = JSON.parse(xhr.responseText);
        var content = '<h1>News</h1>';
        content += "<table style ='margin-top: -2%;border-collapse: collapse;'>";
        var i
        for (i = 0; i < items.length; i++) {
            var img = items[i].enclosureField.urlField;
            var image = '<img src="' + img + '" alt="newsPicture" id="NewsPicture" width="140px" height="140px">';
            var link = items[i].linkField;
            var date = items[i].pubDateField;
            var title = items[i].titleField;
            var description = items[i].descriptionField;

            content += "<tr " + 'style="border-bottom: 1px solid black;">';
            content += "<td><br></br>" + image + "<br></br></td>";
            content += "<td " + 'style = "padding-left:1em"><strong>' + title + "</strong><br/>" + date + "<br><br/>" + description + "</td>";
            content += '</tr>';
        }
        content += "</table>";
        var pageContent = document.getElementById('pageContent');

        document.getElementById('homePage').style.display = "none"; //

        pageContent.innerHTML = content;
    }
    xhr.send()

}

function displayGuestBook() {
    var guestBookPage = document.getElementById('guestbookPage');
    var pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = guestBookPage.innerHTML;
    document.getElementById('homePage').style.display = "none";
}

function displayRegister() {
    var displayRegister = document.getElementById('displayRegister');
    var pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = displayRegister.innerHTML;
    document.getElementById('homePage').style.display = "none";
}

function submitRegister() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var address = document.getElementById('address').value;

    var xhr = new XMLHttpRequest();
    var uri = 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/register' + name;
    xhr.open('POST', uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonComment = JSON.stringify({
        Address: address,
        Name: username,
        Password: password
    });

    xhr.onload = function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("address").value = "";
        var resp = xhr.responseText;
        var showMessage = document.getElementById('showMessage');
        showMessage.innerHTML = resp;
    }

    xhr.send(jsonComment);
}

function displayLogin() {
    var loginpage = document.getElementById('displayLogin');
    var pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = loginpage.innerHTML;
    document.getElementById('homePage').style.display = "none";
}

function LogIn() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var xhr = new XMLHttpRequest();
    var uri = 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/user';
    xhr.open('GET', uri, true, username, password);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function(resp) {
        console.log(resp);
    }
    xhr.send();
}

function submitComment() {
    var comment = document.getElementById('comment').value;
    var name = document.getElementById('commentName').value;

    var xhr = new XMLHttpRequest();
    var uri = 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=' + name;
    xhr.open('POST', uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        document.getElementById('iframe').src = document.getElementById('iframe').src
        document.getElementById("commentName").value = "";
        document.getElementById("comment").value = "";
    }
    xhr.send(JSON.stringify(comment));
    document.getElementById('homePage').style.display = "none";
}

function displayShop(id) {
    if (id == 'shop') {
        var uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = function() {
            var items = JSON.parse(xhr.responseText);

            var content = '';
            var title = document.getElementById('displayShopContent');
            //var shopSearchResult = document.getElementById('shopSearchResult');

            content = title.innerHTML + content;
            content = content + '</br>' + '<div id ="shopContent"> '; //break?

            var i
            for (i = 0; i < items.length; i++) {
                var itemsid = items[i].ItemId;
                var description = items[i].Description;
                var title = items[i].Title;
                var img = '<img src= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=' + itemsid + '" alt="shopPicture" id="shopPicture" width="400" height="350">';


                content += '<div id="itemName">' + title + "<div/>" + "</br>";
                content += "<div>" + img + "</div>" + "</br>";
                content += "<div> " + description;
                content += "<div>" + '<button class="buyButton"' + 'onclick="window.location.href=' + "'http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + itemsid + "'" + '"' + '>Buy Now</button>' + "</div>";
                content += "</div>";
                content += "</br>" + "<hr>" + "</br>";

            }

            content = content + "</div>";

            var pageContent = document.getElementById('pageContent');
            pageContent.innerHTML = content;

            document.getElementById('homePage').style.display = "none";

        }
        xhr.send()
    } else if (id == 'shopSearch') {
        var shopSearchTerm = document.getElementById('shopSearch').value;
        var uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=" + shopSearchTerm;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onload = function() {
            var items = JSON.parse(xhr.responseText);
            var shopSearchResult = document.getElementById('shopSearchResult');
            var content = '';
            content = content + '</br>' + '<div id ="searchContent"> ';


            var i
            for (i = 0; i < items.length; i++) {
                var itemsid = items[i].ItemId;
                var description = items[i].Description;
                var title = items[i].Title;
                var img = '<img src= "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=' + itemsid + '" alt="shopPicture" id="shopPicture" width="400" height="350">';


                content += '<div id="itemName">' + title + "<div/>" + "</br>";
                content += "<div>" + img + "</div>" + "</br>";
                content += "<div> " + description;
                content += "<div>" + '<button class="buyButton"' + 'onclick="window.location.href=' + "'http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + itemsid + "'" + '"' + '>Buy Now</button>' + "</div>";
                content += "</div>";
                content += "</br>" + "</br>" + "</br>";
            }
            content = content + "</div>";
            shopSearchResult.innerHTML = content;
            if (items.length == 0) {
                var pageContent = document.getElementById('shopSearchResult'); ///////////
                pageContent.innerHTML += '<div style = "margin-top: 1%">No such item exists</div>';
            }
            document.getElementById('shopContent').style.display = "none";


        }
        xhr.send()

    }
}

function buyItem(ItemId) {
    window.open("http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + ItemId);
}