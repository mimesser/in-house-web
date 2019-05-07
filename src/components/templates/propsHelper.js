export const propsHelper = () => {
   return (
      <div style={{ display: 'box' }}>
         {placeholderData && (
            <pre>
               <code>{JSON.stringify(placeholderData, null, 2)}</code>
            </pre>
         )}
         {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </div>
   );
};
