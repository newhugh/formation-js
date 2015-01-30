'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ['$scope', 'Bookmark', 'Tag', function ($scope, Bookmark, Tag) {

    $scope.bookmarkList = Bookmark.query();

    $scope.tagList = Tag.query();
    $scope.tagChecked = {};

    $scope.updateTags = function (tag) {
        var refTag = tag.ref_bookmark;
        console.log("coucou", refTag, $scope.tagChecked);
    }


}])




// Le controller qui gère toutes les fonctions bookmark / tag

// D'abord on déclare le nom du controller, puis ses contextes : le scope, et les différentes Factories (penser à l'ajouter en paramètres de la fonction)
.controller('MyCtrl2', ['$scope', 'Bookmark', 'Tag', function ($scope, Bookmark, Tag) {
    // Ici on contrôle le fait qu'on a bien pressé la touche "Entrée" - Si c'est bon on lance la fonction addToBookmark
    $scope.keypressed = function ($event) {
        if ($event.which === 13) {
            $scope.addToBookmark();
        }
    }


    // Fonction addToBookmark, chargée d'ajouter les bookmarks à la base de données
    $scope.addToBookmark = function () {

        // On créée une nouvelle instance de la Factory Bookmark
        $scope.bookmark = new Bookmark();

        // On assigne la colonne "url" de la base de données au model bookmarkToAdd (défini en view) : l'information trouvée dans l'élément bookmarkToAdd (ici un input) est stockée et mise à jour à chaque changement : un peu l'équivalent de la méthode val() jquery
        $scope.bookmark.url = $scope.bookmarkToAdd;

        // On utilise la méthode save d'Angular pour ajouter à la Factory Bookmark des objets de type Bookmark, donc la valeur url est définie plus haut
        Bookmark.save($scope.bookmark, function (res) {

            // On lance la fonction updateBookmark à chaque ajout
            updateBookmark();
            $scope.bookmark = res;
        });
    }

    // pas besoin de lui ajouter $scope puisqu'a priori on aura jamais besoin de l'afficher dans les views
    var updateBookmark = function () {
        // on récupère la liste des bookmarks en utilisant la méthode query d'angular
        $scope.bookmarks = Bookmark.query();
    }
    updateBookmark();

    // idem que pour les bookmarks mais pour les tags
    $scope.addToTag = function () {

        // on vérifie qu'il y a bien un bookmark créé ou sélectionné et que la champ tag n'est pas vide
        if ($scope.bookmark && $scope.tagToAdd) {
            // on créée une nouvelle instance de l'objet Factory Tag (créé dans app.js)
            $scope.tag = new Tag();

            // on précise que tagToAdd en view correspond au champ nom de la base de données
            $scope.tag.nom = $scope.tagToAdd;

            // on récupère la valeur id du bookmark et on l'ajoute au champ ref_bookmark dans la table "tag"
            $scope.tag.ref_bookmark = $scope.bookmark.id;
            Tag.save($scope.tag, function (res) {
                tagUpdate();
            });
        } else {
            window.alert('no bookmark created or no tag entered');
        }
    }

    // la méthode watch permet de faire quelque chose dès que la variable passée en paramètre est modifiée
    $scope.$watch('bookmark', function () {
        tagUpdate();
    });

    var tagUpdate = function () {
        if ($scope.bookmark) {
            $scope.tags = Tag.query({
                ref_bookmark: $scope.bookmark.id
            }, function (res) {
                console.log(res);
            })
        }
    }

    $scope.deleteTag = function (tagId) {
        Tag.delete({
            id: tagId
        }, function (res) {
            tagUpdate();
        })
    }




  }]);
