import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1c1c1c;
  padding: 0 20px;
  height: 60px;
`;

const Logo = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
`;

const NavLink = styled.p`
  color: #b0b0b0;
  text-decoration: none;
  margin: 0 10px;
  font-size: 16px;
  &:hover {
    color: #ffffff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-grow: 1;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const UserName = styled.div`
  margin-right: 10px;
`;

const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  background-color: #5d5d5d;
  border-radius: 50%;
`;

const Navbar = () => {
 const navigate = useNavigate();
    const handleChange = (path:string) => () => {
       navigate(path)
    }

    return (
        <NavBarContainer>
            <Logo>Task master</Logo>
            <NavLinks>
                <NavLink onClick={handleChange("projects")}>Projects</NavLink>
                <NavLink onClick={handleChange("issues")}>Issues</NavLink>
                <NavLink onClick={handleChange("boards")}>Boards</NavLink>
            </NavLinks>
            <UserSection>
                <UserName>John Doe</UserName>
                <UserAvatar />
            </UserSection>
        </NavBarContainer>
    );
};


export default Navbar