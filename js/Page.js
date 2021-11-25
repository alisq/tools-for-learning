class Page {
    constructor(content) {
        this.nid = content.nid;
        this.identity = content.identity;
        this.contents = content.body.replaceAll("/sites/default/files","https://tba.codepanel.in/sites/default/files");;
        //this.editorial = content.field_editorial;
        //this.artists = content.field_artist_s_;

        this.title = content.title;
        this.subtitle = content.field_subtitle;
        //this.bio = content.body;
    }

    get displayList() {
        let item = `<li data-item='${this.identity}' id='link-${this.nid}' data-nid='${this.nid}'>${this.artists}<br />${this.title}</li>`
        return item;
    }

    get displayBookMenu() {
        let item = `<input type='checkbox'  class="book-link" id='book-link-${this.nid}' data-nid='${this.nid}' checked> <label for='book-link-${this.nid}' >${this.title}</label>`
        return item;
    }

    get displayBookContent() {
        let item = `<chapter class="section__book-content--article" id="book-article-${this.nid}">${this.artists} — ${this.title}<br /><br />${this.bio}<br /><br />${this.contents}</chapter>`;
        return item;
    }

    


    get displayFull() {


        let title =  this.title;
        
        $("title").text(title)

        $(".popout").remove();
        
        history.pushState('',"title", window.location.pathname+'#page-'+this.nid);

        /* html */
       let popout = `
        <div class='popout' id='popout__${this.nid}'>
            <div class="popout__menu">
            <div class="popout__pub" data-nid="${this.nid}"><img class="popout__menu--img" src="img/book.svg">
            </div>
                <div class="popout__close">&times;</div>
            </div>
            
            <div class="popout__interior">
            
                  <div class="popout__interior--grid">    
              <div class="popout__interior--grid-left">
               
              <h2>${this.title}
              
              <br />${this.subtitle}
              
              </h2>
        
                  <br /><br />
                  ${this.contents}
                </div>
                <div class="popout__interior--grid-right">
                
              </div>
              </div>
            </div>
        </div>
        `
        
        

        return popout;
    }

    
}


