import React from "react";
import styled from "styled-components";

export const Profile = () => {
  return (
    <ProfileContainer>
      <Title>Информация о профиле</Title>
    </ProfileContainer>
  );
};

const Title = styled.div`
  font-size: 24px;
  margin-top: -180px;
  margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
