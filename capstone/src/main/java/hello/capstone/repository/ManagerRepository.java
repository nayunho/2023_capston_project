package hello.capstone.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import hello.capstone.dto.Item;
import hello.capstone.dto.Member;
import hello.capstone.dto.Notice;
import hello.capstone.dto.Shop;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ManagerRepository {

	private final ManagerMapper managerMapper;
	
	/*
	 * 공지사항 CREATE
	 */
	public void noticeCreate(Notice notice) {
		managerMapper.noticeCreate(notice);
	}
	
	/*
	 * 공지사항 READ
	 */
	public Notice noticeRead(int noticeIdx, String title) {
		return managerMapper.noticeRead(noticeIdx, title);
	}
	
	/*
	 * 공지사항 UPDATE
	 */
	public void noticeUpdate(Notice newNotice) {
		managerMapper.noticeUpdate(newNotice);
	}
	
	/*
	 * 공지사항 DELETE
	 */
	public void noticeDelete(Notice notice) {
		managerMapper.noticeDelete(notice);
	}
	
	/*
	 * 공지사항 READ
	 */
	public List<Notice> noticeReadAll(){
		return managerMapper.noticeReadAll();
	}
	
	/*
	 * 공지사항 알림
	 */
	public List<Map<String, Object>> noticeGetAlarm(){
		return managerMapper.noticeGetAlarm();
	}
	
	
	//사용자 관리-----------------------------------------------------------------------------
	
	/*
	 * 역할 별 사용자 조회
	 */
	public List<Member> getMemberByRole(String role){
		return managerMapper.getMemberByRole(role);
	}
	
	/*
	 * 실패한 예약 조회(신뢰도가 깎인 예약) 깎은 가게와 횟수
	 */
	public List<Map<String, Object>> getFailedReservation(int memberIdx){
		return managerMapper.getFailedReservation(memberIdx);
	}
	
	/*
	 * 신뢰도가 깎인 가게에서 예약한 상품
	 */
	public List<Map<String, Object>> getFailedItems(int shopIdx, int memberIdx){
		return managerMapper.getFailedItems(shopIdx, memberIdx);
	}
	
	
	
	
	//상업자 관리---------------------------------------------------------------------------------------
	
	/*
	 *  해당 상업자의 가게 정보 조회
	 */
	public List<Shop> getShopinfoByBusiness(int owneridx){
		return managerMapper.getShopinfoByBusiness(owneridx);
	}
	
	/*
	 * 해당 가게에 등록했던 상품 조회
	 */
	public List<Item> getIteminfoByBusiness(int shopidx){
		return managerMapper.getIteminfoByBusiness(shopidx);
	}
	
	//-----------------------------------------------------------------------------------------------
	
	
	
	//가게 분석-----------------------------------------------------------------------------------------

	/*
	 * 모든 가게 정보 조회
	 */
	public List<Shop> getShopinfo(){
		return managerMapper.getShopinfo();
	}
	
	/*
	 * 해당 가게에 등록된 상품과 상품별 예약자 수 조회
	 */
	public List<Map<String, Object>> getIteminfo(int shopidx){
		List<Map<String, Object>> iteminfo = managerMapper.getIteminfo(shopidx);
		return iteminfo;
	}
	
	/*
	 * 해당 가게에서 상품을 구매해간 고객 정보 
	 */
	public List<Member> getReservationMember(int shopidx){
		return managerMapper.getReservationMember(shopidx);
	}
	
	
	//검색---------------------------------------------------------------------------------------------------
	
	/*
	 * 모든 아이템 나열
	 */
	public List<Map<String, Object>> getItemAll(){

		return managerMapper.getItemAll();
	}
	
	
	/*
	 * 이름으로 회원검색 - 이름순, 날짜순
	 */
	public List<Member> searchMemberByName(String name){
		return managerMapper.searchMemberByName(name);
	}
	
	
	/*
	 * 이름으로 가게검색 - 이름순, 날짜순
	 */
	public List<Map<String, Object>> searchShopByName(String shopName){
		return managerMapper.searchShopByName(shopName);
	}
	
	
	/*
	 * 이름으로 아이템검색 - 이름순, 날짜순
	 */
	public List<Map<String, Object>> searchItemByName(String itemName){
		return managerMapper.searchItemByName(itemName);
	}
		
	//통계----------------------------------------------------------------------------------
	/*
	 * 소셜 별 회원 수 조회
	 */
	public int getMemeberCountBySocial(String social) {
		return managerMapper.getMemeberCountBySocial(social);
	}
	
	/*
	 * 별점 별 Shop 조회
	 */
	public List<Shop> getShopByRating(double rating){
		
		return managerMapper.getShopByRating(rating);
	}
	
	
}