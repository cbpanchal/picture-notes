import styled from "styled-components";

export const PictureNotesWrapper = styled.div`
  padding-top: 37px;
  width: 100%;
  float: left;
  flex-flow: wrap;
  display: inline-flex;
  float: left;
`;

export const GridImage = styled.img`
  width: 400px;
  height: 400px;
`;

export const PictureNotesCardWrapper = styled.div`
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: auto;
  outline: none;
`;

export const PictureNotesEditCardWrapper = styled.div`
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: auto;
  outline: none;
  display: -webkit-box;
`;

export const TitleNoteWrapper = styled.div`
  display: inline-grid;
  > h2,
  p {
    text-align: left;
  }
`;
