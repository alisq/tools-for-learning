let pages;
  
    url = 'https://tba.codepanel.in/json/pages/';
    fetch(url)
  .then(response => response.json())
    .then(j => {
      
      pages = [...j]
    });

    
url = 'https://tba.codepanel.in/json/articles/';
    fetch(url)
  .then(response => response.json())
    .then(j => {
      for (i=0;i<j.length;i++) {
        
        chapter = new Chapter(j[i]);
        
            
            
            $("#toc").append(chapter.displayTOC)
            $("#chapters").append(chapter.displayBookContent)
            
            
      }});




      class Chapter {
        constructor(content) {
            this.nid = content.nid;
            this.identity = content.identity;
            this.contents = content.field_article_contents.replaceAll("/sites/default/files","https://tba.codepanel.in/sites/default/files");;
            this.editorial_author = content.field_intro_text_author;
            this.editorial_illustration = content.field_editorial_image;
            this.editorial = content.field_editorial;
            this.artists = content.field_artist_s_;
            this.title = content.title;
            this.bio = content.body;
            this.audio = content.field_audio_files.split(", ");
            this.image = content.field_image.replaceAll("/sites/default/files","https://tba.codepanel.in/sites/default/files");
            this.image_caption = $(this.image).attr('alt');
            if (this.image_caption == undefined) {
                this.image_caption="";
            }
            this.bookSafeContents = this.contents.replaceAll('<iframe id="lostRiversMap" src="lostRiversMap.html" title="Lost Rivers Map"></iframe>',"").replaceAll('<iframe id="taguibaoMap" scrolling="no" src="taguibaoMap.html" title="Caitlyn Taguibao Interactive Mural"></iframe>',"")
            
          
        }
    
        get displayTOC() {
            return `<a class=".toc"><h5>${this.artists} ${this.title}</h5></a>`
        }
        
        get displayBookContent() {

            // console.log(this.bookSafeContents)
            
            /* html */
            let item = `<chapter class="chapter section__book-content--article" id="book-article-${this.nid}">
                            <a class=".toc"><h3>${this.artists}</h3><h2> ${this.title}</h2></a>
                        
                            <div class="book--editorial">
                                
                                
                                    ${this.editorial}
                                    <div class="editorial--author">&mdash;${this.editorial_author}</div>
                                
                            </div>
                            
    
                            
                            <div class="lead__image">
                                ${this.image}
                                <div class="lead__image--caption">
                                    ${this.image_caption}
                                </div>
                            </div>
    
                            ${this.bookSafeContents}
                                                
                            <div class="popout__interior--biography">
                                ${this.bio}
                            </div>
                        </chapter>`;
            return item;
        }
    
        
    
    
    
        
    }
    
    

    setTimeout(function(){

        Bindery.makeBook({ 
            content: '#book',
            pageSetup: {
                size: { width: '5in', height: '8in' },
                margin: { top: '48pt', inner: '36pt', outer: '36pt', bottom: '36pt' },
              },
            rules: [
                Bindery.PageReference({
                    selector:'.toc a',
                    replace: (element, number) => {
                      let row = document.createElement('div');
                      row.classList.add('toc-row');
                      row.innerHTML = element.textContent;
                      row.innerHTML += `<span class='num'>${number}</span>`;
                      return row;
                    }
                  }),
                Bindery.RunningHeader({
                    render: (pageInfo) => pageInfo.isLeft
                      ? `${pageInfo.number} · ${pageInfo.heading.h3}`
                      : `${pageInfo.heading.h2} · ${pageInfo.number}`
                  }),
                Bindery.PageBreak({ selector: '.chapter', position: 'before' }),
                Bindery.FullBleedSpread({ selector: '.big-figure' }),
              ], 
              
            
            });

    },500)