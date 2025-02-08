package com.TradeSpot.configuration;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Aspect // Add @Aspect here to mark this class as an Aspect
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // Define a date formatter for the timestamp
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private LocalDateTime initTime;
    private LocalDate execTime;

    // Define a pointcut for all methods in a specific package
    @Pointcut(" execution(* com.TradeSpot.services..*(..)) || execution(* com.TradeSpot.repositories..*(..))")
    public void applicationPackagePointcut() {
        // This method is empty and is used only as a pointcut reference
    }

    @Before("applicationPackagePointcut()")
    public void logMethodCall(JoinPoint joinPoint) {
        initTime = LocalDateTime.now();
        logger.info("Execution started at: {}", initTime.toString());
        logger.info("Executing method: {}", joinPoint.getSignature().getName());
        logger.info("With arguments: {}", joinPoint.getArgs());
    }

    @After("applicationPackagePointcut()")
    public void logMethodExit(JoinPoint joinPoint) {
        logger.info("Exited method: {}", joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "applicationPackagePointcut()", returning = "result")
    public void logMethodReturn(JoinPoint joinPoint, Object result) {
        logger.info(" Method: {} ", joinPoint.getSignature().getName());
        Duration duration = Duration.between(initTime,LocalDateTime.now());
        logger.info("TAT: = Seconds: {} NanoSeconds: {}", duration.getSeconds(),duration.getNano());
    }
}

