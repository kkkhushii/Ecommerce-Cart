import React,{useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../Services/cryptoNewsApi'
import { useGetCryptosQuery  } from '../Services/cryptoApi'
// import Loader from './Loader';


function News({simplified}) {
  const { Text, Title } = Typography;
   const { Option } = Select;
   const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

   //cryptocurrency ne lagati news mate cryptonews:cryptocurrenncies compnnet nathi  and 6 j ove hhhe news mate count
   const {data:cryptoNews,isFetching}=useGetCryptoNewsQuery({newsCategory,count:simplified ? 6 : 12})
  //  const {data:cryptoNews}=useGetCryptoNewsQuery({newsCategory:'Cryptocurrency',count:simplified ? 6 : 12})

   console.log("cryptoNews",cryptoNews);
   const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
   const { data } = useGetCryptosQuery(100);
  //  if(isFetching) return <Loader/>;
  return (
  
    <Row gutter={[24, 24]}>
        {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            // optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}


    {cryptoNews && cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>{news.name}</Title>
                <img style={{maxWidth:'200PX',maxHeight:"100px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf().fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      </Row>
   
  );
};

export default News;