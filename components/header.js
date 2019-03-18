export default function Header() {
   return (
      <header>
         <h1>In<strong>House</strong></h1>
         <i className="material-icons">
            menu
         </i>

         <style jsx>{`
            header {
               display: flex;
               height: 60px;
               align-items: center;
               padding: 0 20px;
            }
            i {
               margin-left: auto;
            }
            h1 {
               font-weight: 300;
               font-size: 18px;
            }
            h1 strong {
               color: #9b9b9b;
            }
         `}
         </style>
      </header>
   )
}
