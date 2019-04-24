const STROKE_WIDTH = 2;

export default function CircleProgress({ score, size = 60 }) {
   const validScore = (() => {
      if (score < 0) return 0;
      if (score > 10) return 10;
      return score;
   })();

   const percentage = validScore * 10;

   const offset = 100 - percentage;

   const [base, decimal] = validScore.toFixed(1).split('.');

   const angle = percentage * 3.6;

   const x = 16 + 15.9155 * Math.cos((angle * Math.PI) / 180);
   const y = 16 + 15.9155 * Math.sin((angle * Math.PI) / 180);

   return (
      <div className="content">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 40 40">
            <circle cx="16" cy="16" r="15.9155" className="circle-background" />
            <circle cx="16" cy="16" r="15.9155" className="circle-progress" />
            <circle cx={x} cy={y} r="2.5" className="dot" />
         </svg>
         <div className="score">
            <div className="base">{base}.</div>
            <div className="decimal">{decimal}</div>
         </div>

         <style jsx>
            {`
               svg {
                  height: ${size}px;
                  width: ${size}px;
                  transform: rotate(90deg);
               }

               .circle-background {
                  fill: none;
                  stroke: #e5e5e5;
                  stroke-width: ${STROKE_WIDTH}px;
               }

               .dot {
                  fill: #ffffff;
                  stroke: #14dced;
                  stroke-width: ${STROKE_WIDTH};
               }

               .circle-progress {
                  fill: none;
                  stroke: #14dced;
                  stroke-dasharray: 100 100;
                  stroke-dashoffset: ${offset};
                  stroke-width: ${STROKE_WIDTH};
                  transition: stroke-dashoffset 1s ease-in-out;
               }

               .content {
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }

               .score {
                  position: absolute;
                  display: flex;
               }
               .base {
                  font-size: 18px;
                  font-weight: bold;
               }
               .decimal {
                  font-size: 12px;
                  font-weight: bold;
                  margin-top: 3px;
               }
            `}
         </style>
      </div>
   );
}
