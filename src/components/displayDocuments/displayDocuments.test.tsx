import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Document, Tag } from "./documents";
import { DisplayDocuments } from "../displayDocuments/displayDocuments";
import userEvent from "@testing-library/user-event";

const sampleDocuments: Document[] = [
  {
    title: "test1",
    uri: "test1",
    imageSrc: "",
    tags: [Tag.TRADETRUST, Tag.STORABLE]
  },
  {
    title: "test2",
    uri: "test2",
    imageSrc: "",
    tags: [Tag.OPENCERTS]
  },
  {
    title: "test3",
    uri: "test3",
    imageSrc: "",
    tags: [Tag.OPENCERTS]
  },
  {
    title: "test4",
    uri: "test4",
    imageSrc: "",
    tags: [Tag.LICENCE]
  },
  {
    title: "MPA Certificate of Competency",
    uri: "test5",
    imageSrc: "test5",
    tags: [Tag.LICENCE]
  },
  {
    title: "test6",
    uri: "test6",
    imageSrc: "",
    tags: [Tag.LICENCE, Tag.STORABLE]
  }
];

describe("displayDocuments", () => {
  it("should show all documents, when 'All' button is pressed", () => {
    expect.assertions(1);
    const { getByText, getAllByTestId } = render(<DisplayDocuments documents={sampleDocuments} />);
    const allButton = getByText("All");
    fireEvent.click(allButton);
    const displayCard = getAllByTestId("display-card");
    expect(displayCard).toHaveLength(sampleDocuments.length);
  });

  it("should show only TradeTrust documents, when 'TradeTrust' button is pressed", () => {
    expect.assertions(1);
    const { getByText, getAllByTestId } = render(<DisplayDocuments documents={sampleDocuments} />);
    const tradeTrustButton = getByText("TradeTrust");
    fireEvent.click(tradeTrustButton);
    const displayCard = getAllByTestId("display-card");
    expect(displayCard).toHaveLength(1);
  });

  it("should show OpenCerts documents, when 'OpenCerts' button is pressed", () => {
    expect.assertions(1);
    const { getByText, getAllByTestId } = render(<DisplayDocuments documents={sampleDocuments} />);
    const openCertsButton = getByText("OpenCerts");
    fireEvent.click(openCertsButton);
    const displayCard = getAllByTestId("display-card");
    expect(displayCard).toHaveLength(2);
  });

  it("should show Licence documents, when 'Licence' button is pressed", () => {
    expect.assertions(1);
    const { getByText, getAllByTestId } = render(<DisplayDocuments documents={sampleDocuments} />);
    const licenceButton = getByText("Licence");
    fireEvent.click(licenceButton);
    const displayCard = getAllByTestId("display-card");
    expect(displayCard).toHaveLength(3);
  });

  it("should show Storable documents, when 'Storable' button is pressed", () => {
    expect.assertions(1);
    const { getByText, getAllByTestId } = render(<DisplayDocuments documents={sampleDocuments} />);
    const storableButton = getByText("Storable");
    fireEvent.click(storableButton);
    const displayCard = getAllByTestId("display-card");
    expect(displayCard).toHaveLength(2);
  });

  it("should show OpenCerts Demo, when 'certs' is typed in searchbar", () => {
    expect.assertions(2);
    const { queryAllByTestId, getByTestId, findByText } = render(<DisplayDocuments documents={sampleDocuments} />);
    const searchBarInput = getByTestId("search-bar-input");
    userEvent.type(searchBarInput, "certs");
    const documentsRendered = queryAllByTestId("document-name");
    expect(documentsRendered).toHaveLength(1);
    const demoCert = findByText("OpenCerts Demo");
    expect(demoCert).not.toBeNull();
  });
});
