import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.management.RuntimeErrorException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import org.springframework.util.Base64Utils;

@Slf4j
public class CheckSign {

  private static final String secretKey = "";


  public static void main(String[] args) throws Exception {
    //POST sign example
//        String timestamp = "1684813405151";
//        String body = "{\"symbol\":\"TRXUSDT\",\"marginCoin\":\"USDT\",\"size\":551,\"side\":\"buy\",\"orderType\":\"limit\",\"price\":0.0555,\"force\":\"normal\"}";
//
//        String sign = generate(timestamp,"POST","/api/v2/mix/order/place-order" ,null,body,secretKey);
//        log.info("sign:{}",sign);


    //GET sign example
    String timestamp = "1684814440729";
    String queryString = "marginCoin=usdt&symbol=btcusdt"; // Need to be sorted in ascending alphabetical order by key
    String sign = generate(timestamp,"GET","/api/v2/mix/account/account" ,queryString,null,secretKey);
    log.info("sign:{}",sign);
  }



  private static Mac MAC;

  static {
    try {
      CheckSign.MAC = Mac.getInstance("HmacSHA256");
    } catch (NoSuchAlgorithmException var1) {
      throw new RuntimeErrorException(new Error("Can't get Mac's instance."));
    }
  }

  public static String generate(String timestamp, String method, String requestPath,
                                String queryString, String body, String secretKey)
          throws CloneNotSupportedException, InvalidKeyException, UnsupportedEncodingException {

    method = method.toUpperCase();
    body = StringUtils.defaultIfBlank(body, StringUtils.EMPTY);
    queryString = StringUtils.isBlank(queryString) ? StringUtils.EMPTY : "?" + queryString;
    String preHash = timestamp + method + requestPath + queryString + body;
    log.info("preHash:{}",preHash);
    byte[] secretKeyBytes = secretKey.getBytes("UTF-8");
    SecretKeySpec secretKeySpec = new SecretKeySpec(secretKeyBytes, "HmacSHA256");
    Mac mac = (Mac) CheckSign.MAC.clone();
    mac.init(secretKeySpec);
    return Base64.getEncoder().encodeToString(mac.doFinal(preHash.getBytes("UTF-8")));
  }

}