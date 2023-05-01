import Link from "next/link";
import React from "react";

function Rounds() {
  return (
    <section className="rounds">
      <div className="rounds-container">
        <div className="rounds-title">
          <h2>
            Steps to participate in the <span>$FAISAA</span> IDO
          </h2>
        </div>
        <div className="rounds_steps">
          <div className="steps">
            <h3>Step 1</h3>
            <p>
              Get some $CORE and Wrapped it $wCORE
            </p>
          </div>
          <div className="steps">
            <h3>Step 2</h3>
            <p>
              Commit your $wCore to IDO 
              1 FAISAA = 0.25 USD worth $wCORE
            </p>
          </div>
          <div className="steps">
            <h3>Step 3</h3>
            <p>
              The contract will send your $FAISAA token to your wallet after ido is finished
            </p>
          </div>
        </div>
        <div className="rounds-btn btn">
          <Link href="/join">ENTER IDO</Link>
        </div>
      </div>
    </section>
  );
}

export default Rounds;
