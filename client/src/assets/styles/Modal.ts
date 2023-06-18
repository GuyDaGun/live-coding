import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  h2 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--grey-900);
  border: 1px solid #ccc;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  padding: 2rem 2.5rem;
  margin: 3rem auto;
  max-height: 80vh;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  /* transition: opacity 0.3s, visibility 0.3s; */
  max-width: 800px;
  border-top: 5px solid var(--primary-500);
}

.modal:hover {
  box-shadow: var(--shadow-4);
}

.modal.visible {
  opacity: 1;
  visibility: visible;
}
`
export default Wrapper
