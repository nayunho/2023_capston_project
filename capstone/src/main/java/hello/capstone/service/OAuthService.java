package hello.capstone.service;

import com.google.gson.JsonParser;

import hello.capstone.dto.NaverOauthParams;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Slf4j
@Service
public class OAuthService{
	
    public String getKakaoAccessToken (String code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=2874c74d0b5306bd4c7cf2485f045577"); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=http://localhost:3000/login/oauth2/Kakao_loading"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            @SuppressWarnings("deprecation")
			JsonParser parser = new JsonParser();
            @SuppressWarnings("deprecation")
			JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }
    public HashMap<String, Object> getUserInfo (String access_Token) {
        
        //    요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            
            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);
            
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            
            String line = "";
            String result = "";
            
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);
            
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            
            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            
            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
            
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return userInfo;
    }
    
    public ResponseEntity<String> getNaverAccessToken(String code, String state) {
      	 // RestTemplate 인스턴스 생성
          RestTemplate rt = new RestTemplate();

          HttpHeaders accessTokenHeaders = new HttpHeaders();
          accessTokenHeaders.add("Content-type", "application/x-www-form-urlencoded");

          MultiValueMap<String, String> accessTokenParams = new LinkedMultiValueMap<>();
          accessTokenParams.add("grant_type", "authorization_code");
          accessTokenParams.add("client_id", "rmptq4twehWBueMreZ2L");
          accessTokenParams.add("client_secret", "Vr7_Qu_Nhs");
          accessTokenParams.add("code" , code);	// 응답으로 받은 코드
          accessTokenParams.add("state" , state); // 응답으로 받은 상태

          HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(accessTokenParams, accessTokenHeaders);

          ResponseEntity<String> accessTokenResponse = rt.exchange(
                  "https://nid.naver.com/oauth2.0/token",
                  HttpMethod.POST,
                  accessTokenRequest,
                  String.class
          );
          
          return accessTokenResponse;
      }

      public HashMap<String, Object> getNaverInfo (ResponseEntity<String> accessTokenResponse){
      	RestTemplate rt = new RestTemplate();
      	
      	// 이전에 받았던 Access Token 응답 
          ObjectMapper objectMapper = new ObjectMapper();
          
          // json -> 객체로 매핑하기 위해 NaverOauthParams 클래스 생성
          NaverOauthParams naverOauthParams = null;
          try {
              naverOauthParams = objectMapper.readValue(accessTokenResponse.getBody(), NaverOauthParams.class);
          } catch (JsonProcessingException e) {
              e.printStackTrace();
          }
          
          // header를 생성해서 access token을 넣어줍니다.
          HttpHeaders profileRequestHeader = new HttpHeaders();
          profileRequestHeader.add("Authorization", "Bearer " + naverOauthParams.getAccess_token());
          
          HttpEntity<HttpHeaders> profileHttpEntity = new HttpEntity<>(profileRequestHeader);
          
          // profile api로 생성해둔 헤더를 담아서 요청을 보냅니다.
          ResponseEntity<String> profileResponse = rt.exchange(
                  "https://openapi.naver.com/v1/nid/me",
                  HttpMethod.POST,
                  profileHttpEntity,
                  String.class
          );
   		
   		 JsonParser parser = new JsonParser(); 
   		 JsonElement element = parser.parse(profileResponse.getBody());
   		  
   		 JsonObject properties = element.getAsJsonObject().get("response").getAsJsonObject();

   		 String name = properties.getAsJsonObject().get("name").getAsString();
   		 String email = properties.getAsJsonObject().get("email").getAsString();
   		 String phone = properties.getAsJsonObject().get("mobile").getAsString();
          
         log.info("name={}",name);
         log.info("email={}",email);
         log.info("phone={}",phone);
         
         HashMap<String, Object> naverInfo = new HashMap<String, Object>();
         naverInfo.put("name", name);
         naverInfo.put("id", email);
         naverInfo.put("phone", phone);
          
      	return naverInfo; 
      } 
    
}