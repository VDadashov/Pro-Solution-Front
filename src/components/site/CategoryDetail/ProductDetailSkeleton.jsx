import React from 'react'
import styled from 'styled-components';
import { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DetailWrapper, Wrapper, DetailHead, Nav, DetailBody, DetailCard, DetailItem, ThumbnailList, MainImageWrapper, DetailInfo, DetailList, DetailFoot, Socials } from "@styles/common/categoryDetail";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingSkeleton = styled(Skeleton)`
    width: 100%;
    animation: ${pulse} 1.5s infinite ease-in-out;
    `;

const DetailSkeleton = ({ imageCount }) => (
    <DetailWrapper>
        <Wrapper>
            <DetailHead>
                <Nav>
                    <LoadingSkeleton width={100} height={20} />
                </Nav>
            </DetailHead>

            <DetailBody>
                <DetailCard>
                    <ThumbnailList>
                        {[...Array(imageCount)].map((_, i) => (
                            <LoadingSkeleton
                                key={i}
                                width={60}
                                height={60}
                                style={{ marginBottom: "10px" }}
                            />
                        ))}
                    </ThumbnailList>

                    <MainImageWrapper>
                        <LoadingSkeleton height={"100%"} width={"100%"} />
                    </MainImageWrapper>
                </DetailCard>

                <DetailInfo>
                    <div className="DetailInfoHead">
                        <LoadingSkeleton height="100%" width="80%" />
                        <hr />
                        <div className="price">
                            <LoadingSkeleton height={20} width={80} />
                        </div>

                        <DetailList>
                            {[...Array(10)].map((_, i) => (
                                <DetailItem key={i}>
                                    <LoadingSkeleton height={15} width={"40%"} />
                                </DetailItem>
                            ))}
                        </DetailList>
                        <DetailFoot>
                            <p>
                                <LoadingSkeleton height={15} width={"40%"} />
                            </p>
                            <Socials>
                                <LoadingSkeleton height={15} width={"100%"} />
                            </Socials>
                        </DetailFoot>
                    </div>
                </DetailInfo>
            </DetailBody>
        </Wrapper>
    </DetailWrapper>
);

const ProductDetailSkeleton = ({ imageCount }) => {

    return (
        <DetailSkeleton imageCount={imageCount} />
    )
}

export default ProductDetailSkeleton