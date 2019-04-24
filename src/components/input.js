export default function Input({ onChange, ...props }) {
   return (
      <div className="input">
         <i className="material-icons">search</i>
         <input {...props} onChange={evt => onChange(evt.target.value)} />
         <style jsx>
            {`
               .input {
                  position: relative;
               }
               i {
                  position: absolute;
                  top: calc(50% - 22px);
                  color: #1a90e4;
                  padding: 10px;
                  cursor: pointer;
               }
               i:hover {
                  color: #0a80d4;
               }
               input {
                  font-size: 16px;
                  padding: 12px 12px 12px 40px;
                  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
                  border: none;
                  width: 100%;
                  border-radius: 3px;
                  border: 1px solid transparent;
               }
               input:active,
               input:focus {
                  border: 1px solid #1a90e4;
               }
               input::placeholder {
                  color: #a3a3a3;
               }
            `}
         </style>
      </div>
   );
}
