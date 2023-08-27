"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

import { Button, Colors, Loading, TextStyle } from "@/components/atoms";
import Navbar from "@/components/template/Navbar";
import useContactDetailHook from "@/helper/hooks/useContactDetailHook";

type tabValue = 0 | 1;

const DetailContact = ({ params }: { params: { contactId: string } }) => {
  const { error, loading, contact } = useContactDetailHook({
    contactId: parseInt(params.contactId),
  });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<tabValue>(0);
  const [showMenu, setShowmenu] = useState(false);

  const handleSetActiveTab = (tab: tabValue) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Loading loading={loading} />
      <Navbar
        steps={["1", "2"]}
        rightIcon="ellipse-vertical"
        onClickNavRight={() => {
          setShowmenu((prev) => !prev);
        }}
        onClickNavLeft={() => router.push("/")}
        listMenu2={[
          {
            label: "Edit",
            icon: "pencil",
            iconColor: Colors.NEUTRAL_40,
            onClick: () => {
              setShowmenu(false);
              router.push("/contact/2/edit");
            },
          },
          {
            label: "Delete",
            icon: "trash",
            iconColor: Colors.ERROR,
            onClick: () => {
              console.log("delete");
              setShowmenu(false);
            },
          },
          {
            label: "Favorite",
            icon: "star-solid",
            iconColor: Colors.SECONDARY_10,
            onClick: () => {
              console.log("favorite");
              setShowmenu(false);
            },
          },
        ]}
        showMenu2={showMenu}
      />
      <TopDetailWrapper>
        <Image width="90" height="90" src="/avatar.jpg" alt="" />
        <TextStyle size="sm" weight="bold" className="name">
          {`${contact?.first_name || ""} ${contact?.last_name || "-"}`}
        </TextStyle>
        <TextStyle color={Colors.NEUTRAL_40} size="xs" className="location">
          Yogyakarta, Indonesia
        </TextStyle>
      </TopDetailWrapper>

      <TabBtnContainer>
        <TabBtnContent>
          <div className="placeholder" onClick={() => handleSetActiveTab(0)}>
            <TextStyle size="sm" color={Colors.NEUTRAL_40} weight="semibold">
              Details
            </TextStyle>
          </div>
          <div className="placeholder" onClick={() => handleSetActiveTab(1)}>
            <TextStyle size="sm" color={Colors.NEUTRAL_40} weight="semibold">
              History
            </TextStyle>
          </div>
          <TabButton tab={activeTab}>Details</TabButton>
        </TabBtnContent>
      </TabBtnContainer>

      <TabContent>
        {activeTab === 0 ? (
          <DetailContainer>
            <DetailContent>
              <TextStyle size="xs" weight="semibold" color={Colors.NEUTRAL_40}>
                Phone Number :
              </TextStyle>
              <NumberList>
                {contact?.phones.map((item, i) => (
                  <li key={i}>
                    <TextStyle size="sm" weight="bold">
                      {item.number}
                    </TextStyle>
                  </li>
                ))}
              </NumberList>
            </DetailContent>
            <DetailContent>
              <TextStyle size="xs" weight="semibold" color={Colors.NEUTRAL_40}>
                Email :
              </TextStyle>
              <TextStyle size="sm" weight="bold">
                ahmadnzr.dev@gmail.com
              </TextStyle>
            </DetailContent>
            <DetailContent>
              <TextStyle size="xs" weight="semibold" color={Colors.NEUTRAL_40}>
                Website :
              </TextStyle>
              <TextStyle size="sm" weight="bold">
                ahmadnzr.dev
              </TextStyle>
            </DetailContent>
          </DetailContainer>
        ) : (
          <TextStyle size="sm" weight="bold" color={Colors.NEUTRAL_40}>
            No History found
          </TextStyle>
        )}
      </TabContent>
    </div>
  );
};

export default DetailContact;

const TopDetailWrapper = styled.div({
  textAlign: "center",
  "& img": {
    borderRadius: "100%",
  },
  "& .name": {
    marginTop: "10px",
  },
  "& .location": {
    marginTop: "5px",
  },
});

const TabBtnContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const TabBtnContent = styled.div({
  width: "fit-content",
  position: "relative",
  padding: "8px 0",
  display: "flex",
  backgroundColor: "var(--neutral-20)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-md-2)",

  "& .placeholder": {
    width: "150px",
    textAlign: "center",
    cursor: "pointer",
  },
});

const TabButton = styled(Button)`
  width: 150px !important;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props: { tab: tabValue }) => props.tab * 150 + "px"};
  transition: var(--transition);
`;

const TabContent = styled.div`
  width: 300px;
  margin: 40px auto;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NumberList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
