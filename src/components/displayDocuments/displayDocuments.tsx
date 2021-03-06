import React, { ReactElement, useState, useEffect } from "react";
import { cssContainerWrapper } from "../../constants";
import styled from "@emotion/styled";
import { useFuzzy } from "react-use-fuzzy";
import { MenuBar } from "./menuBar/menuBar";
import { DocumentCard } from "./documentCard";
import { Tag, Document } from "./documents";

const SectionContainer = styled.section`
  background-color: #e5e5e5;
`;

interface DisplayDocumentsProps {
  documents: Document[];
}

export const DisplayDocuments: React.FunctionComponent<DisplayDocumentsProps> = ({
  documents
}: DisplayDocumentsProps) => {
  const [selectedButton, setSelectedButton] = useState<Tag | undefined>();
  const [searchValue, setSearchValue] = useState("");
  const { result, search: fuzzySearch } = useFuzzy<Document>(documents, {
    keys: ["title"]
  });

  useEffect(() => {
    fuzzySearch(searchValue);
  }, [fuzzySearch, searchValue]);

  const displayCards = (documents: Document[]): ReactElement[] => {
    return documents
      .filter(document => !selectedButton || document.tags.includes(selectedButton))
      .filter(document => !searchValue || result.includes(document))
      .map((doc, index) => (
        <DocumentCard title={doc.title} uri={doc.uri} imageSrc={doc.imageSrc} tags={doc.tags} key={index} />
      ));
  };

  return (
    <>
      <MenuBar
        setSelectedButton={setSelectedButton}
        selectedButton={selectedButton}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />

      <SectionContainer className="py-16">
        <div className={`${cssContainerWrapper} md:px-00`}>
          <div className="flex flex-wrap">{displayCards(documents)}</div>
        </div>
      </SectionContainer>
    </>
  );
};
