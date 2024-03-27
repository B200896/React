import { useState } from "react";

function Counter() {
  let [counter, setcounter] = useState(0);

  function inc() {
    counter = counter + 1;
    setcounter(counter);
  }
   

  function dec() {
    counter = counter - 1;
    setcounter(counter);
  }
  return (
    <>
      <div className="counter">
        <div className="inner-counter">
          <button onClick={inc}>+</button>
          <span>{counter}</span>
          <button onClick={dec}>-</button>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur {counter} adipisicing elit. Fuga maxime at deleniti {counter} dignissimos vitae natus voluptates exercitationem, deserunt recusandae tempore libero suscipit sequi quia expedita in quo dolorum maiores. {counter} Nesciunt perferendis impedit, veritatis, omnis eligendi amet nobis qui autem consequatur a ullam blanditiis tempora aut accusantium odit. {counter} Atque, voluptates odio?</p>
      </div>
    </>
  );
}

export default Counter;
