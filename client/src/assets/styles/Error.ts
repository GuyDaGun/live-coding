import styled from 'styled-components'

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--primary-500);
  }

  .error {
  width: 90vw;
  max-width: var(--fixed-width);
  background: var(--grey-900);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  padding: 2rem 2.5rem;
  margin: 3rem auto;
  transition: var(--transition);
  border-top: 5px solid var(--primary-500);
}
.error:hover {
  box-shadow: var(--shadow-4);
}
`

export default Wrapper
