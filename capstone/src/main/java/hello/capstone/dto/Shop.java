package hello.capstone.dto;



import java.sql.Date;
import java.util.List;
import lombok.Data;

@Data
public class Shop {
	
	private String shopName;
	private int ownerIdx;
	private String imageFilename;
	private String shopAddress;
	private String shopTel;
	private String shopWebsite;
	private String promotionText;
	private Date registrationDate;
	private String longitude;
	private String latitude;
	
	public Shop() {
		
	}

	public Shop(String shopName, int ownerIdx, String imageFilename,
			String shopAddress, String shopTel, String shopWebsite, String promotionText, Date registrationDate,
			String longitude, String latitude) {
		this.shopName = shopName;
		this.ownerIdx = ownerIdx;
		this.imageFilename = imageFilename;
		this.shopAddress = shopAddress;
		this.shopTel = shopTel;
		this.shopWebsite = shopWebsite;
		this.promotionText = promotionText;
		this.registrationDate = registrationDate;
		this.longitude = longitude;
		this.latitude = latitude;
	}
	
}