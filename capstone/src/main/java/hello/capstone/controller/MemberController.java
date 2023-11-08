package hello.capstone.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import hello.capstone.dto.Member;
import hello.capstone.dto.Shop;
import hello.capstone.exception.ValidationException;
import hello.capstone.service.ItemService;
import hello.capstone.service.MemberService;
import hello.capstone.service.ShopService;
import hello.capstone.validation.group.UpdateInfoValidationGroup;
import hello.capstone.validation.group.UpdatePwValidationGroup;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberService memberService;
	private final ShopService shopService;
	private final ItemService itemService;
	private final MessageSource messageSource;
	
	/*
	 * 즐겨찾기 등록
	 */
	@PostMapping("/bookmark/registration")
	public String bookmarkRegistration(HttpSession session, @RequestBody Shop shop) {
		Member member = (Member) session.getAttribute("member");
		
		int memberIdx = memberService.getMeberIdx(member);
		int shopIdx = shopService.getShopIdx(shop);
		
		memberService.bookmarkRegistration(memberIdx, shopIdx);
		
		return "/home_user";
	}
	
	/*
	 * 즐겨찾기 삭제
	 */
	@PostMapping("/bookmark/delete")
	public List<Shop> bookmarkDelete(HttpSession session, @RequestBody List<Shop> shops) {
		Member member = (Member) session.getAttribute("member");
		
		for (Shop shop : shops) {
			memberService.bookmarkDelete(member.getMemberIdx(), shop.getShopidx());
        }
		
		return bookmarkCheck(session);
	}
	
	
	/*
	 * 즐겨찾기 목록 조회
	 */
	@GetMapping("/bookmark/check")
	public List<Shop> bookmarkCheck(HttpSession session) {
		Member member = (Member) session.getAttribute("member");
				
		return memberService.getMyBookmarkedShop(member.getMemberIdx());
	}
	
	/*
	 * 닉네임 변경
	 */
	@PutMapping("/update/nickname")
	public String updateNickname(@RequestBody HashMap<String,String> nick, HttpSession session) {
		
		String nickname = nick.get("nickname");
		Member member = (Member) session.getAttribute("member");
		
		memberService.updateNickname(member, nickname);
		session.setAttribute("member", member);
		
		return "home_user";
	}
	
	/*
	 * 비밀번호 수정
	 */
	@PutMapping("/update/pw")
	public String updatePw(@Validated(value = UpdatePwValidationGroup.class) @ModelAttribute Member member, BindingResult bindingResult,
						   @RequestParam("oldpw") String oldPw,HttpSession session) {
		
		if(bindingResult.hasErrors()) {
			sendErrors(bindingResult);
    	}

		Member oldMember = (Member)session.getAttribute("member");
		memberService.pwCheck(oldMember, oldPw);
		
		Member newMember = memberService.updatePwOnPurpose(oldMember, member.getPw());
		session.setAttribute("member", newMember);
		
		return "/";
	}
	
	/*
	 * 회원정보 수정
	 */
	@PutMapping("/update/info")
	public String updateInfo(@Validated(value = UpdateInfoValidationGroup.class) @RequestBody Member member, 
							 BindingResult bindingResult, HttpSession session) {
		
		if(bindingResult.hasErrors()) {
			sendErrors(bindingResult);
    	}
		
		Member oldMember = (Member) session.getAttribute("member");
		oldMember = memberService.updateMember(oldMember, member);
		
		session.setAttribute("member", oldMember);
		
		return "home_user";
	}
	
	
	/*
	 * 회원 탈퇴
	 */
	@DeleteMapping("/delete")
	public String deleteMember(HttpSession session, String pw) {
		
		Member member = (Member) session.getAttribute("member");
		memberService.pwCheck(member, pw);
		memberService.deleteMember(member);
		
		session.removeAttribute("member");
		
		return "login";
	}
	
	
	/*
	 * 알람 가져오기
	 */
	@GetMapping("/getAlarm")
	public List<Map<String, Object>> getAlarm(HttpSession session){
		Member member = (Member) session.getAttribute("member");	
		List<Map<String, Object>> alarms = itemService.getAlarm(memberService.getMeberIdx(member));
		
		return alarms;
	}
	
	/*
	 * 읽은 알람 삭제
	 */
	@DeleteMapping("deleteReadAlarm")
	public void deleteReadAlarm(@RequestBody Shop shop, HttpSession session) {
		itemService.deleteReadAlarm(shop, (Member)session.getAttribute("member"));
	}
	
	
//----------------------------------------------------------------------------------------------------------
	
	// 검증 오류
	private void sendErrors(BindingResult bindingResult) {
		Map<String, String> errors = new HashMap<>();
    	for (FieldError error : bindingResult.getFieldErrors()) {
    		String em = messageSource.getMessage(error, Locale.getDefault());
            errors.put(error.getField(), em);
        }
    	throw new ValidationException(errors);
	}

	
	
}










