movieApp = angular.module('movieApp', []);
movieApp.controller('searchController', function ($scope) {
    $scope.movieList = [
        {
            name: 'Goodfellas',
            year: "1990",
            director: "Martin Scorsese"
        },
        {
            name: "Pulp fiction",
            year: "1994",
            director: "Quentin Tarantino"
        },
        {
            name: 'A Clockwork Orange',
            year: '1971',
            director: 'Stanley Kubrick'
        },
        {
            name: "Bottle Rocket",
            year: "1996",
            director: "Wes Anderson"
        },
        {
            name: 'Stalker',
            year: '1979',
            director: 'Andrei Tarkovsky'
        },
        {
            name: "Requiem for a Dream",
            year: "2000",
            director: "Darren Arnofsky"
        },
        {
            name: 'There Will Be Blood',
            year: '2007',
            director: 'Paul Thomas Anderson'
        }
    ];

    $scope.originalFilteredMovieListOrder = [];
    $scope.selectedSortOption = 'timeadded-ascending';
    $scope.sort = function () {
        switch ($scope.selectedSortOption) {
            case "name-ascending":
                $scope.filteredMovieList.sort(function (a, b) {
                    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
                });
                break;

            case "name-descending":
                $scope.filteredMovieList.sort(function (a, b) {
                    return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
                });
                break;

            case "year-ascending":
                $scope.filteredMovieList.sort(function (a, b) {
                    return a.year - b.year;
                });
                break;

            case "year-descending":
                $scope.filteredMovieList.sort(function (a, b) {
                    return b.year - a.year;
                });
                break;

            case 'director-ascending':
                $scope.filteredMovieList.sort(function (a, b) {
                    return a.director.toLowerCase() > b.director.toLowerCase() ? 1 : -1;
                });
                break;

            case 'director-descending':
                $scope.filteredMovieList.sort(function (a, b) {
                    return b.director.toLowerCase() > a.director.toLowerCase() ? 1 : -1;
                });
                break;

            case 'timeadded-ascending':
                if ($scope.searchKey) {
                    $scope.filteredMovieList.length = 0;
                    $scope.originalFilteredMovieListOrder.forEach(function (index) {
                        $scope.filteredMovieList.push($scope.movieList[index]);
                    });
                    break;
                } else {
                    $scope.filteredMovieList = $scope.movieList.slice();
                }
                break;

            case 'timeadded-descending':
                if ($scope.searchKey) {
                    $scope.filteredMovieList.length = 0;
                    $scope.originalFilteredMovieListOrder.slice().reverse().forEach(function (index) {
                        $scope.filteredMovieList.push($scope.movieList[index]);
                    });
                    break;
                } else {
                    $scope.filteredMovieList = $scope.movieList.slice().reverse();
                }
                break;
        }
    }

    $scope.originalFilteredMovieListOrder = [];
    $scope.filteredMovieList = [];
    $scope.searchMovies = function () {
        $scope.filteredMovieList = $scope.movieList.filter(function (movie) {
            var query = $scope.searchKey.toLowerCase();
            return (
                movie.name.toLowerCase().includes(query) ||
                movie.year.includes(query) ||
                movie.director.toLowerCase().includes(query)
            );
        });

        $scope.originalFilteredMovieListOrder.length = 0;   
        $scope.filteredMovieList.forEach(function (movie) {
            $scope.originalFilteredMovieListOrder.push($scope.movieList.indexOf(movie));
        });
    };
    $scope.filteredMovieList = $scope.movieList;

    $scope.$watch('selectedSortOption', function () {
        $scope.sort();
    });

    

});
