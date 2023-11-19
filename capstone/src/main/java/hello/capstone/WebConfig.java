package hello.capstone;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import hello.capstone.interceptor.BusinessCheckInterceptor;
import hello.capstone.interceptor.LoginCheckInterceptor;
import hello.capstone.interceptor.ManagerCheckInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer{
   
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") // cors를 적용할 spring서버의 url 패턴.
                .allowedOrigins("http://localhost:3000") // cors를 허용할 도메인. 제한을 모두 해제하려면 "**"
                .allowedMethods("OPTIONS","GET","POST","PUT","DELETE") // cors를 허용할 method
              .allowCredentials(true);
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       registry.addInterceptor(new LoginCheckInterceptor())
             .order(1)
             .addPathPatterns("/getSessionMember");
       
       registry.addInterceptor(new BusinessCheckInterceptor())
           .order(2)
           .addPathPatterns("/getSessionMember/business");
       
       registry.addInterceptor(new ManagerCheckInterceptor())
           .order(3)
           .addPathPatterns("/getSessionMember/manager");
       
    }

}