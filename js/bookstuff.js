
let bookContent = [];



$(document).on("click","#make-book",function(){
  bookContent = [];
  $(".section__book-menu--interior .book-link").each(function(){
    if ($(this).is(':checked')) {
      bookContent.push($(this).data("nid"))
    }
  })

  let bookURL = "https://tba.codepanel.in/book-content/"+bookContent.join("+");


    


    let runningHeaders = Bindery.RunningHeader({
        render: (page) =>  {return `<div class="book__head--left">Toronto Biennial of Art</div>  <div class="book__head--center">${page.number}</div> <div class="book__head--right">Programs Publication</div>` }
          
      });
      

      let eachText = Bindery.PageBreak({
        selector: '.views-row',
        position: 'after'
      });

      let imageCaptionBreak = Bindery.PageBreak({
        selector: '.book__no-break',
        position: 'avoid'
      })
      
      let spreadRule = Bindery.FullBleedSpread({
        selector: '.big-figure',
      });
    
      
      Bindery.makeBook({ 
        content: {
          selector: '.view-book-content',
          url: bookURL,
        },
          view: Bindery.View.PRINT,
          printSetup: { layout: Bindery.Layout.PAGES },
          rules: [runningHeaders, eachText, imageCaptionBreak, spreadRule],
          pageSetup: {
            size: { width: '8.5in', height: '11in' },
            
            margin: { top: '72pt', inner: '0pt', outer: '0pt', bottom: '24pt' },
          },
        
        });
      
  })