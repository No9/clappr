exports.SiteList = SiteList;

function Site() {
            this.left = 0;
            this.top = 0
            this.width = 0;
            this.height = 0;
            this.row;
            this.column;
            this.state = 0;
            this.color = "rgb(0, 0, 0)";
            this.shade = 0;
        }

function SiteList(iRows, iCols) {
    var iRowCounter;
    var iColCounter;
    var a = new Array(iRows);
            for (iRowCounter = 0; iRowCounter < iRows; iRowCounter++) {
                a[iRowCounter] = new Array(iCols);
                for (iColCounter = 0; iColCounter < iCols; iColCounter++) {

                    var site = new Site();
                    site.row = iRowCounter;
                    site.column = iColCounter;
                    var left = (iColCounter + 1) * 15;
                    var top = (iRowCounter + 1) * 15;
                    site.left = left;
                    site.top = top;
                    site.height = 15;
                    site.width = 15;
                    site.state = 0;
                    site.color = "rgb(0, 0, 0)"
                    a[iRowCounter][iColCounter] = site;
                }
            }
            return (a);
        } 