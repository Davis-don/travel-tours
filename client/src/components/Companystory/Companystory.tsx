import './companystory.css';  

function Companystory() {  
  return (  
    <div className="voyago-story">  
      <div className="voyago-header">  
        <h1 className="voyago-title">Our Story</h1>  
        <p className="voyago-subtitle">How a simple idea transformed into unforgettable adventures</p>  
      </div>  

      <div className="voyago-timeline">  
        <div className="voyago-event">  
          <h2 className="voyago-event-title">The Spark</h2>  
          <p className="voyago-event-date">January 2025</p>  
          <p className="voyago-event-desc">  
            It all began on a backpacking trip through the Balkans. Our founders, Alex and Maria, realized that most tours felt rigid and impersonal. They dreamed of a travel experience where every journey felt like an adventure with friends—not just a checklist of tourist spots.  
          </p>  
        </div>  

        <div className="voyago-event">  
          <h2 className="voyago-event-title">First Steps</h2>  
          <p className="voyago-event-date">June 2025</p>  
          <p className="voyago-event-desc">  
            With nothing but passion and a laptop, they launched Voyago in a tiny co-working space in Barcelona. Their first tour—a hidden-gems exploration of Costa Brava—sold out in 48 hours. Travelers loved the mix of local storytelling, spontaneous detours, and small-group intimacy.  
          </p>  
        </div>  

        <div className="voyago-event">  
          <h2 className="voyago-event-title">The Turning Point</h2>  
          <p className="voyago-event-date">November 2025</p>  
          <p className="voyago-event-desc">  
            A viral TikTok video of a surprise flamenco performance in a Seville orange grove put Voyago on the map. Suddenly, travelers weren’t just booking trips—they were joining a movement. By year’s end, we’d expanded to 12 destinations across Europe, each with its own "Voyago twist."  
          </p>  
        </div>  

        <div className="voyago-event">  
          <h2 className="voyago-event-title">Today & Beyond</h2>  
          <p className="voyago-event-date">2026 & Forward</p>  
          <p className="voyago-event-desc">  
            Now, Voyago isn’t just a tour company—it’s a community of curious explorers. We’ve introduced "Storyteller Guides" (locals who weave history into immersive experiences), "Surprise Routes" (where travelers vote on daily adventures), and eco-conscious travel initiatives. Next stop? Rewriting the rules of global exploration.  
          </p>  
        </div>  
      </div>  

      <div className="voyago-mission">  
        <h2 className="voyago-mission-title">Our Mission</h2>  
        <p className="voyago-mission-text">  
          To turn every trip into a living story—where travelers don’t just see places, but <em>feel</em> them. Because the best journeys aren’t about the miles covered, but the memories created.  
        </p>  
      </div>  
    </div>  
  );  
}  

export default Companystory;  