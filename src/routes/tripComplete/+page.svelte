
<!-- trip over page -->

<section class="content">
    <div class="container">
      <h1> Receipt Trip Details </h1>
      <a href="/">Back </a>
    </div>
  </section>

  <script>
    let rating = 0;
    let feedback = '';
    const name = 'John Smith';
    const distance = '10 miles';
    const price = '$20.00';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
    const handleStarClick = (value) => {
      rating = value;
    };
  
    const handleFeedbackChange = (event) => {
      feedback = event.target.value;
    };
  
    const handleSubmit = () => {
      // submit rating and feedback data to backend API
    };
  </script>
  
  <div class="receipt">

    <h2>Thank you for riding with us! </h2>
    <p>Name: {name}</p>
    <p>Total distance: {distance}</p>
    <p>Price: {price}</p>
    <p>Date: {date}</p>
    <div class="rating">
      <p>Please rate your experience:</p>
      <div class="stars">
        {#each Array(5) as _, i}
          <span class="star" on:click={() => handleStarClick(i+1)}>
            {#if i < rating}
              &#9733;
            {:else}
              &#9734;
            {/if}
          </span>
        {/each}
      </div>
      <textarea class="feedback" on:input={handleFeedbackChange} value={feedback} placeholder="Leave feedback"></textarea>
      <button on:click={handleSubmit}>Submit</button>
    </div>
  </div>
  
  <style>
  .receipt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    font-family: Arial, sans-serif;
    color: #333;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 600px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 16px;
  }

  .detail {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .label {
    font-weight: bold;
  }

  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    width: 100%;
  }

  .stars {
    display: flex;
    gap: 8px;
    font-size: 32px;
  }

  .star {
    cursor: pointer;
    transition: color 0.2s;
  }

  .star:hover, .star:focus {
    color: #ffcc00;
  }

  .feedback {
    width: 100
  }
  </style>