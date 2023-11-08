package hello.capstone.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hello.capstone.dto.Inquiry;
import hello.capstone.dto.Member;
import hello.capstone.service.InquiryService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequestMapping("/inquiry")
@RestController
@RequiredArgsConstructor
public class InquiryController {

	private final InquiryService inquiryService;
	
	 /*
      * 1:1문의 전체 나열
      */
     @GetMapping("/view")
     public List<Map<String, Object>> inquiryView(HttpSession session){
        Member member = (Member) session.getAttribute("member");
        int memberidx = member.getMemberIdx();
        return inquiryService.inquiryView(memberidx);
     }
	
	/*
	 * 1:1 문의 답변 보기(사용자 입장)
	 */
	@GetMapping("/user/answer/view")
	public Inquiry inquiryAnswerView(@RequestParam("inquiryidx") int inquiryIdx) {
		return inquiryService.inquiryAnswerView(inquiryIdx);
	}
	
	/*
	 * 1:1문의 등록
	 */
	 @PostMapping("/register")
	 public String inquiryRegister(HttpSession session, @RequestParam("content_inquiry") String contentInquiry) {
	  
		Inquiry inquiry = new Inquiry();
		  
		Member member = (Member)session.getAttribute("member");
		  
		int userIdx = member.getMemberIdx();
		long miliseconds = System.currentTimeMillis();
		Date redate = new Date(miliseconds);
		  
		inquiry.setUseridx(userIdx);
		inquiry.setContent_inquiry(contentInquiry);
		inquiry.setRedate(redate);
		  
		inquiryService.register(inquiry);
		  
		return "";
	 }
	
	/*
	 * 1:1문의 삭제
	 */
	@DeleteMapping("/delete")
	public void inquiryDelete(@RequestParam("inquiryidx") int inquiryIdx) {
		
		inquiryService.delete(inquiryIdx);
	}
	
	/*
	 * 1:1문의 수정
	 */
	@PutMapping("/update")
	public String inquiryUpdate(@RequestParam("inquiryidx") int inquiryIdx,
								@RequestParam("content_inquiry") String contentInquiry) {
		
		inquiryService.update(inquiryIdx, contentInquiry);
		
		return "";
	}
	
	/*
	 * 1:1문의 답변 등록
	 */
	@PostMapping("/answer")
	public String inquiryAnswer(@RequestParam("inquiryidx") int inquiryIdx,
			 					@RequestParam("adminidx") int adminIdx,
			 					@RequestParam("content_answer") String contentAnswer) {
		
		long miliseconds = System.currentTimeMillis();
		Date answerRedate = new Date(miliseconds);
		
		Inquiry inquiry = new Inquiry(inquiryIdx, 0, null, null, adminIdx, answerRedate, contentAnswer, "답변 완료");
		
		inquiryService.inquiryAnswer(inquiry);
		
		return "";
	}
	
	/*
	 * 1:1문의 답변 삭제
	 */
	@DeleteMapping("/answer/delete")
	public void inquiryAnswerDelete(@RequestParam("inquiryidx") int inquiryIdx,
									@RequestParam("adminidx") int adminIdx) {

		inquiryService.inquiryAnswerDelete(inquiryIdx,adminIdx);
	}
	
	/*
	 * 1:1문의 답변 수정
	 */
	@PutMapping("/answer/update")
	public String inquiryAnswerUpdate(@RequestParam("inquiryidx") int inquiryIdx,
									  @RequestParam("adminidx") int adminIdx,
									  @RequestParam("content_answer") String contentAnswer) {
	
		
		inquiryService.inquiryAnswerUpdate(inquiryIdx, adminIdx, contentAnswer);
		
		return "";
	}
	
}