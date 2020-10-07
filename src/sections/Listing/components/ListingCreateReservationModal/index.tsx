import React from "react";
import { Button, Divider, Modal, Typography } from "antd";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../../../lib/utils";
import { KeyOutlined } from "@ant-design/icons";
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements";

interface Props {
  price: number;
  modalVisible: boolean;
  checkInDate: Moment;
  checkOutDate: Moment;
  setModalVisible: (modalVisible: boolean) => void;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateReservationModal = ({
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  setModalVisible,
  stripe,
}: Props & ReactStripeElements.InjectedStripeProps) => {
  const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
  const listingPrice = price * daysBooked;

  const handleCreateReservation = async () => {
    if (!stripe) {
      return;
    }
    let { token: stripeToken } = await stripe.createToken();
    console.log(stripeToken);
    // _ip: "", created: 1602078810, …}
    // card: {id: "card_1HZd5CIYLzHD4CRqwRox2QPv", object: "card", address_city: null, address_country: null, address_line1: null, …}
    // client_ip: ""
    // created: 1602078810
    // id: "tok_1HZd5CIYLzHD4CRqqFJr0npc"
    // livemode: false
    // object: "token"
    // type: "card"
    // used: false
    // __proto__: Object
  };

  return (
    <Modal
      visible={modalVisible}
      centered
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-boooking-modal__intro-title">
            <KeyOutlined translate="true" />
          </Title>
          <Title level={3} className="listing-boooking-modal__intro-title">
            Book your trip
          </Title>
          <Paragraph>
            Enter your payment information to book the listing from the dates
            between{" "}
            <Text mark strong>
              {moment(checkInDate).format("MMMM Do YYYY")}
            </Text>{" "}
            and{" "}
            <Text mark strong>
              {moment(checkOutDate).format("MMMM Do YYYY")}
            </Text>
            , inclusive.
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={" "}
            <Text strong>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__stripe-card-section">
          <CardElement
            hidePostalCode
            className="listing-booking-modal__stripe-card"
          />
          <Button
            size="large"
            type="primary"
            className="listing-booking-modal__cta"
            onClick={handleCreateReservation}
          >
            Book
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export const WrappedListingCreateReservationModal = injectStripe(
  ListingCreateReservationModal
);